const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const afkDataPath = path.join(__dirname, "afk_data.json");
const MAX_NICKNAME_LENGTH = 32; // Maximum allowed length for a Discord nickname

// Configuration
const config = {
  NICKNAME_PREFIX: "[AFK]",
  MAX_REASON_LENGTH: 100, // Maximum characters allowed for the AFK reason
  LINK_ATTEMPTS_LIMIT: 3, // Limit of link attempts
  MUTE_DURATION: "15m", // Mute duration in a readable format (s, m, h, w)
};

// Convert duration to milliseconds
function parseDuration(duration) {
  const timeValue = parseInt(duration.slice(0, -1)); // The numeric value of the duration
  const timeUnit = duration.slice(-1); // The last letter indicating the time unit

  switch (timeUnit) {
    case "s": // seconds
      return timeValue * 1000;
    case "m": // minutes
      return timeValue * 60 * 1000;
    case "h": // hours
      return timeValue * 60 * 60 * 1000;
    case "w": // weeks
      return timeValue * 7 * 24 * 60 * 60 * 1000;
    default:
      throw new Error("Unsupported time unit");
  }
}

// Mute duration in milliseconds
const MUTE_DURATION_MS = parseDuration(config.MUTE_DURATION);

// Texts and Embeds
const lang = {
  commands: {
    afk: "ill brb",
  },
  messages: {
    nicknameTooLong:
      "**You are now AFK**, but your nickname is too long to add `{NICKNAME_PREFIX}`.",
    afkReasonTooLong:
      "**The reason for AFK cannot exceed {MAX_REASON_LENGTH} characters.**",
    noReasonProvided: "Not specified",
    afkReturned:
      "**Welcome back!** {username} , your AFK status was removed, you were AFK for {totalAFKTime}.",
    afkNotify:
      "**{username} has been AFK for {elapsed}**\n**Reason:** {reason}",
    userMuted:
      "{username} has been muted for 15 minutes due to repeated link attempts.",
    missingPermissions:
      "Could not apply the timeout to {id} due to lack of permissions.",
  },
  embed: {
    color: "#7D6EB5", // Light purple to blue
    title: "AFK Mode",
    description: "**Reason:** {reason}",
    footerText: "Hope you come back soon",
  },
};

const userLinkAttempts = {};

module.exports = {
  run: async (client) => {
    console.log("AFK command loaded!"); // Confirmation message

    client.on("messageCreate", async (message) => {
      if (message.author.bot) return;

      const userId = message.author.id;
      let afkData = {};

      try {
        if (fs.existsSync(afkDataPath)) {
          afkData = JSON.parse(fs.readFileSync(afkDataPath));
        }
      } catch (err) {
        console.error("Error reading AFK data:", err);
        afkData = {};
      }

      const afkCommandPrefix = lang.commands.afk.toLowerCase();
      if (message.content.toLowerCase().startsWith(afkCommandPrefix)) {
        let reason = message.content.slice(afkCommandPrefix.length).trim();

        // Check if the reason contains a link
        if (/https?:\/\/\S+/i.test(reason)) {
          if (!userLinkAttempts[userId]) {
            userLinkAttempts[userId] = 0;
          }
          userLinkAttempts[userId]++;

          if (userLinkAttempts[userId] >= config.LINK_ATTEMPTS_LIMIT) {
            // Check if timeout can be applied
            if (message.member.moderatable) {
              try {
                await message.member.timeout(
                  MUTE_DURATION_MS,
                  "Excessive use of links"
                );
                const replyMessage = await message.reply({
                  content: lang.messages.userMuted.replace(
                    "{username}",
                    message.author.username
                  ),
                });
                // Delete the message after 5 seconds
                setTimeout(() => replyMessage.delete(), 5000);
              } catch (error) {
                console.error(`Could not apply timeout: ${error}`);
              }
            } else {
              console.log(
                lang.messages.missingPermissions.replace(
                  "{id}",
                  message.author.id
                )
              );
            }

            userLinkAttempts[userId] = 0; // Reset the counter
          }

          await message.delete();
          return;
        }

        // Check the character limit for the reason
        if (reason.length > config.MAX_REASON_LENGTH) {
          await message.reply({
            content: lang.messages.afkReasonTooLong.replace(
              "{MAX_REASON_LENGTH}",
              config.MAX_REASON_LENGTH
            ),
          });
          await message.delete();
          return;
        }

        // If no reason is provided, set a default value
        if (!reason) {
          reason = lang.messages.noReasonProvided;
        }

        const now = Date.now();
        const originalNickname =
          message.member.nickname || message.author.username;
        const newNickname = `${config.NICKNAME_PREFIX} ${originalNickname}`;

        if (!afkData[userId]) {
          afkData[userId] = {
            reason,
            time: now,
            originalNickname,
          };

          try {
            fs.writeFileSync(afkDataPath, JSON.stringify(afkData, null, 2));
          } catch (err) {
            console.error("Error writing AFK data:", err);
          }

          // Check if the resulting nickname would be too long
          if (newNickname.length > MAX_NICKNAME_LENGTH) {
            await message.reply({
              content: lang.messages.nicknameTooLong.replace(
                "{NICKNAME_PREFIX}",
                config.NICKNAME_PREFIX
              ),
              ephemeral: true,
            });
          } else {
            // Change the user's nickname on the server (if possible)
            try {
              if (canChangeNickname(message.member)) {
                await message.member.setNickname(newNickname);
              }
            } catch (err) {
              console.error("Could not change nickname:", err);
            }
          }

          // Reply with an embed
          await message.reply({
            embeds: [
              new EmbedBuilder()
                .setColor(lang.embed.color)
                .setTitle(lang.embed.title)
                .setAuthor({
                  name: message.author.username,
                  iconURL: message.author.displayAvatarURL({
                    format: "png",
                    size: 2048,
                  }),
                })
                .setDescription(
                  lang.embed.description.replace("{reason}", reason)
                )
                .setThumbnail(
                  message.author.displayAvatarURL({ format: "png", size: 2048 })
                )
                .setTimestamp()
                .setFooter({ text: lang.embed.footerText }),
            ],
          });
        } else {
          afkData[userId].reason = reason;
          afkData[userId].time = now;

          try {
            fs.writeFileSync(afkDataPath, JSON.stringify(afkData, null, 2));
          } catch (err) {
            console.error("Error writing AFK data:", err);
          }
        }

        return;
      }

      if (afkData[userId]) {
        const afkInfo = afkData[userId];
        const totalAFKTime = formatTotalAFKTime(afkInfo.time);
        delete afkData[userId];

        try {
          fs.writeFileSync(afkDataPath, JSON.stringify(afkData, null, 2));
        } catch (err) {
          console.error("Error writing AFK data:", err);
        }

        const member = message.guild.members.cache.get(userId);
        if (member && afkInfo.originalNickname) {
          const cleanedNickname = afkInfo.originalNickname
            .replace(config.NICKNAME_PREFIX, "")
            .trim();

          try {
            if (canChangeNickname(member)) {
              await member.setNickname(cleanedNickname);
            }
          } catch (err) {
            console.error("Could not restore original nickname:", err);
          }
        }

        await message.reply({
          content: lang.messages.afkReturned
            .replace("{username}", message.author.username)
            .replace("{totalAFKTime}", totalAFKTime),
          allowedMentions: { repliedUser: false },
        });
      }

      for (const mention of message.mentions.users.values()) {
        if (afkData[mention.id]) {
          const afkInfo = afkData[mention.id];
          const elapsed = formatTotalAFKTime(afkInfo.time);

          await message.reply({
            content: lang.messages.afkNotify
              .replace("{username}", mention.username)
              .replace("{elapsed}", elapsed)
              .replace("{reason}", afkInfo.reason),
            allowedMentions: { repliedUser: false },
          });
        }
      }
    });
  },
};

function canChangeNickname(member) {
  const botMember = member.guild.members.me;
  if (!botMember) return false;
  if (!member.manageable) return false;
  if (member.roles.highest.position >= botMember.roles.highest.position)
    return false;
  return true;
}

function formatTotalAFKTime(startTime) {
  const elapsedMilliseconds = Date.now() - new Date(startTime).getTime();
  const elapsedHours = Math.floor(elapsedMilliseconds / (1000 * 60 * 60));
  const elapsedMinutes = Math.floor(
    (elapsedMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );

  if (elapsedHours > 0) {
    return `${elapsedHours} hours and ${elapsedMinutes} minutes`;
  } else {
    return `${elapsedMinutes} minutes`;
  }
}
