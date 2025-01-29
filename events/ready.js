const { ActivityType, EmbedBuilder, ChannelType } = require("discord.js");
const fs = require("fs");
const yaml = require("js-yaml");
const moment = require("moment-timezone");
const colors = require("ansi-colors");
const packageFile = require("../package.json");
const GuildData = require("../models/guildDataSchema");
const UserData = require("../models/UserData");
const Verification = require("../models/verificationSchema");
const Ticket = require("../models/tickets");
const BotActivity = require("../models/BotActivity");
const {
  handleVerification,
  createUnverifiedRoleIfNeeded,
  handleJoinRoles,
} = require("../events/Verification/VerificationEvent");
const { startBot } = require("../index");
const botStartTime = Date.now();

async function logStartupMessages(client) {
  try {
    const guild = client.guilds.cache.first();
    const guildDataFilter = { guildID: guild.id };
    const guildData = await GuildData.findOne(guildDataFilter);
    const totalTickets = await Ticket.countDocuments({});

    console.log(
      colors.cyan(
        "\n██████╗ ██████╗  █████╗ ██╗  ██╗ ██████╗ \n██╔══██╗██╔══██╗██╔══██╗██║ ██╔╝██╔═══██╗\n██║  ██║██████╔╝███████║█████╔╝ ██║   ██║\n██║  ██║██╔══██╗██╔══██║██╔═██╗ ██║   ██║\n██████╔╝██║  ██║██║  ██║██║  ██╗╚██████╔╝\n╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ "
      )
    );
    console.log(colors.white("\n" + colors.bold("Bot") + " v" + packageFile.version));
    console.log(colors.gray("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"));
    console.log(colors.bold("Quick Links"));
    console.log(colors.blue("■") + " Support    " + colors.white("discord.drakodevelopment.net"));
    console.log(colors.green("■") + " Docs       " + colors.white("docs.drakodevelopment.net"));
    console.log(colors.magenta("■") + " Addons     " + colors.white("discord.drakodevelopment.net") + "\n");
    console.log(colors.bold("Statistics"));
    console.log(
      colors.yellow("■") +
        " Starts      " +
        colors.white(guildData.timesBotStarted.toLocaleString("en-US"))
    );
    console.log(
      colors.yellow("■") +
        " Messages    " +
        colors.white(guildData.totalMessages.toLocaleString("en-US"))
    );
    console.log(
      colors.yellow("■") +
        " Suggestions " +
        colors.white(guildData.totalSuggestions.toLocaleString("en-US"))
    );
    console.log(colors.yellow("■") + " Tickets     " + colors.white(totalTickets.toLocaleString("en-US")) + "\n");

    const logMessage = "\n[" + new Date().toLocaleString() + "] [READY] Bot is now online and ready!";
    fs.appendFile("./logs.txt", logMessage, (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      }
    });

    if (guildData.timesBotStarted === 1) {
      console.log(colors.yellow("First-time Setup"));
      console.log(colors.gray("■") + " Need help? Create a ticket in our Discord.");
      console.log(colors.gray("■") + " Read our docs: " + colors.white("docs.drakodevelopment.net"));
      console.log(
        colors.red("\nImportant: Leaking or redistributing our products is prohibited.")
      );
      console.log(colors.gray("By using this bot, you agree to our terms of service.") + "\n");
    }
    console.log(colors.gray("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
    console.log(colors.green.bold("Bot is now online and ready!"));
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function getUptime() {
  const duration = moment.duration(Date.now() - botStartTime);
  let uptimeString = "";
  const years = duration.years();
  const months = duration.months();
  const weeks = duration.weeks();
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  if (years > 0) {
    uptimeString += years + "y ";
  }
  if (years > 0 || months > 0) {
    uptimeString += months + "mo ";
  }
  if ((years > 0 || months > 0 || weeks > 0) && !days) {
    uptimeString += weeks + "w ";
  }
  if (years > 0 || months > 0 || weeks > 0 || days > 0) {
    uptimeString += days + "d ";
  }
  uptimeString += hours + "h " + minutes + "m " + seconds + "s";
  return uptimeString.trim();
}

async function getTicketStatistics(guildId) {
  const totalTickets = await Ticket.countDocuments({ guildId });
  const openTickets = await Ticket.countDocuments({ guildId, status: "open" });
  const closedTickets = await Ticket.countDocuments({ guildId, status: "closed" });
  const deletedTickets = await Ticket.countDocuments({ guildId, status: "deleted" });

  return {
    totalTickets,
    openTickets,
    closedTickets,
    deletedTickets,
  };
}

module.exports = async (client) => {
  client.on("guildMemberAdd", async (member) => {
    await handleJoinRoles(member);
  });

  client.guilds.cache.forEach(async (guild) => {
    try {
      let verificationData = await Verification.findOne({ guildID: guild.id });
      if (!verificationData) {
        verificationData = new Verification({
          guildID: guild.id,
          msgID: null,
          unverifiedRoleID: null,
        });
        await verificationData.save();
      }
      await createUnverifiedRoleIfNeeded(guild, verificationData);
      await handleVerification(client, guild);
    } catch (error) {
      console.error(
        "Failed to initialize verification for guild " + guild.id + ": " + error
      );
    }
  });

  const mainGuild = client.guilds.cache.get(client.guilds.cache.first().id);
  if (!mainGuild) {
    console.log("\x1b[31m%s\x1b[0m", "[ERROR] The bot is not in the configured server!");
    process.exit();
  }

  let guildData = await GuildData.findOne({ guildID: mainGuild.id });
  if (guildData) {
    guildData.timesBotStarted++;
    await guildData.save();
  } else {
    guildData = new GuildData({
      guildID: mainGuild.id,
      cases: 0,
      totalMessages: 0,
      stars: {},
      totalSuggestions: 0,
      timesBotStarted: 1,
    });
    await guildData.save();
  }

  let verificationData = await Verification.findOne({ guildID: mainGuild.id });
  if (!verificationData) {
    verificationData = new Verification({
      guildID: mainGuild.id,
      msgID: null,
      unverifiedRoleID: null,
    });
    await verificationData.save();
  }

  {
    const clientInstance = client;
    let activityIndex = 0;
    setInterval(async () => {
      const guildId = clientInstance.guilds.cache.first().id;
      const botActivityData = await BotActivity.findOne({ guildId });

      if (botActivityData && botActivityData.activities.length > 0) {
        try {
          const guild = clientInstance.guilds.cache.get(guildId);
          if (guild) {
            try {
              await guild.members.fetch();
            } catch (error) {
              if (error.code !== "GuildMembersTimeout") {
                console.error("Error fetching members:", error);
              }
            }
            await guild.channels.fetch();

            const totalChannels = guild.channels.cache.filter(
              (channel) =>
                channel.type === ChannelType.GuildText ||
                channel.type === ChannelType.GuildVoice ||
                channel.type === ChannelType.GuildCategory ||
                channel.type === ChannelType.GuildForum ||
                channel.type === ChannelType.GuildStageVoice
            ).size;

            const onlineMembers = guild.members.cache.filter((member) =>
              ["online", "idle", "dnd"].includes(member.presence?.status)
            ).size;

            const uptime = getUptime();
            const {
              totalTickets,
              openTickets,
              closedTickets,
              deletedTickets,
            } = await getTicketStatistics(guildId);

            const formatter = new Intl.NumberFormat("en-US");
            const activity = botActivityData.activities[activityIndex];
            const statusMessage = activity.status
              .replace(/{total-users}/g, formatter.format(guild.memberCount))
              .replace(/{total-channels}/g, formatter.format(totalChannels))
              .replace(/{total-messages}/g, formatter.format(guildData.totalMessages))
              .replace(/{online-members}/g, formatter.format(onlineMembers))
              .replace(/{uptime}/g, uptime)
              .replace(/{total-boosts}/g, formatter.format(guild.premiumSubscriptionCount))
              .replace(/{total-cases}/g, formatter.format(guildData.cases))
              .replace(/{total-suggestions}/g, formatter.format(guildData.totalSuggestions))
              .replace(/{times-bot-started}/g, formatter.format(guildData.timesBotStarted))
              .replace(/{total-tickets}/g, formatter.format(totalTickets))
              .replace(/{open-tickets}/g, formatter.format(openTickets))
              .replace(/{closed-tickets}/g, formatter.format(closedTickets))
              .replace(/{deleted-tickets}/g, formatter.format(deletedTickets));

            let activityType;
            switch (activity.activityType.toUpperCase()) {
              case "WATCHING":
                activityType = ActivityType.Watching;
                break;
              case "PLAYING":
                activityType = ActivityType.Playing;
                break;
              case "COMPETING":
                activityType = ActivityType.Competing;
                break;
              case "STREAMING":
                activityType = ActivityType.Streaming;
                break;
              case "CUSTOM":
                activityType = ActivityType.Custom;
                break;
              default:
                console.log("Invalid Activity Type: " + activity.activityType);
                activityType = ActivityType.Playing;
            }

            const presenceData = {
              activities: [
                {
                  name: statusMessage,
                  type: activityType,
                },
              ],
              status: activity.statusType.toLowerCase(),
            };

            if (activityType === ActivityType.Streaming && activity.streamingURL) {
              presenceData.activities[0].url = activity.streamingURL;
            }

            await clientInstance.user.setPresence(presenceData);
            await clientInstance.user.setStatus(activity.statusType.toLowerCase());
          } else {
            console.log("Guild not found for ID: " + guildId);
          }
        } catch (error) {
          console.error("Error updating bot activity:", error);
        }

        activityIndex = (activityIndex + 1) % botActivityData.activities.length;
      }
    }, 30000);
  }

  client.guilds.cache.forEach((guild) => {
    if (!guild.id.includes(guild.id)) {
      guild.leave();
      console.log(
        "\x1b[31m%s\x1b[0m",
        "[INFO] Someone tried to invite the bot to another server! I automatically left it (" +
          guild.name +
          ")"
      );
    }
  });

  if (mainGuild && !mainGuild.members.me.permissions.has("Administrator")) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "[ERROR] The bot doesn't have enough permissions! Please give the bot ADMINISTRATOR permissions in your server or it won't function properly!"
    );
  }

  try {
    await startBot();
    logStartupMessages(client);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
