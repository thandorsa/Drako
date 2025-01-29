const {
  Client,
  ChannelType,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActivityType,
  SlashCommandBuilder,
  ApplicationCommandType,
  ContextMenuCommandBuilder,
  REST,
  Events,
  Collection,
  RoleSelectMenuBuilder,
  StringSelectMenuBuilder
} = require("discord.js");
const {
  Font
} = require("canvacord");
const fs = require("fs");
const yaml = require("js-yaml");
const path = require("path");
const colors = require("ansi-colors");
const axios = require("axios");
const glob = require("glob");
const {
  Routes
} = require("discord-api-types/v10");
const moment = require("moment-timezone");
const config = yaml.load(fs.readFileSync("./config.yml", "utf8"));
const commandConfig = yaml.load(fs.readFileSync("./commands.yml", "utf8"));
const lang = yaml.load(fs.readFileSync("././lang.yml", "utf8"));
const client = require("./index.js");
const mongoManager = require("./models/manager.js");
const UserData = require("./models/UserData.js");
const ReactionRole = require("./models/ReactionRole");
const packageJson = require("./package.json");
const startGiveawayScheduler = require("./events/Giveaways/giveawayScheduler.js");
const startAfkScheduler = require("./events/AFK/afkScheduler.js");
const {
  handleUserJoiningTriggerChannel,
  handleUserLeavingChannel
} = require("./events/voiceStateUpdate");
const {
  startAlertScheduler
} = require("./events/Tickets/checkAlerts");
const {
  handleVoiceXP
} = require("./events/Levels/handleXP");
const ChannelStat = require("./models/channelStatSchema");
const TempRole = require("./models/TempRole");
const TwitchStreamers = require("./models/twitch");
const Reminder = require("./models/reminder");
const Poll = require("./models/poll");
const Ticket = require("./models/tickets");
const GuildData = require("./models/guildDataSchema");
const Invite = require("./models/inviteSchema");
client.commands = new Collection();
client.slashCommands = new Collection();
client.snipes = new Collection();
client.commandsReady = false;
const messageDeletions = new Map();
(async () => {
  try {
    await mongoManager();
  } catch (_0x804d2e) {
    console.error("Failed to connect to MongoDB: " + _0x804d2e.message);
    process.exit(1);
  }
  global.leaderboardCache = {
    balance: [],
    invites: [],
    levels: [],
    messages: [],
    lastUpdated: null
  };
  const _0x1b59c6 = async _0x27ed34 => {
    try {
      const _0x38c475 = _0x27ed34.guilds.cache.get(config.GuildID);
      if (!_0x38c475) {
        console.error("Guild not found");
        return;
      }
      const _0x12b639 = await _0x38c475.members.fetch();
      const _0x5b87de = new Set(_0x12b639.map(_0x48daa7 => _0x48daa7.id));
      const _0x2c6700 = {
        $in: [..._0x5b87de]
      };
      const _0x45351d = {
        userId: _0x2c6700,
        $or: [{
          balance: {
            $gt: 0
          }
        }, {
          bank: {
            $gt: 0
          }
        }]
      };
      const _0x540983 = {
        $match: _0x45351d
      };
      const _0x54d349 = {
        totalBalance: -1
      };
      const _0x513546 = {
        $sort: _0x54d349
      };
      const _0x378c3d = await UserData.aggregate([_0x540983, {
        $project: {
          userId: 1,
          balance: 1,
          bank: 1,
          totalBalance: {
            $sum: ["$balance", "$bank"]
          }
        }
      }, _0x513546, {
        $limit: 500
      }]).exec();
      global.leaderboardCache.balance = _0x378c3d.map(_0x4c9452 => ({
        userId: _0x4c9452.userId,
        totalBalance: _0x4c9452.totalBalance,
        displayBalance: _0x4c9452.balance || 0,
        bank: _0x4c9452.bank || 0
      }));
      const _0x44ea2a = {
        $in: [..._0x5b87de]
      };
      const _0x4276fa = {
        invites: {
          $gt: 0
        },
        _id: _0x44ea2a
      };
      const _0x56f8c1 = {
        $match: _0x4276fa
      };
      const _0x3f87d4 = {
        invites: -1
      };
      const _0x2b172a = {
        $sort: _0x3f87d4
      };
      const _0x4d9b5a = await Invite.aggregate([{
        $group: {
          _id: "$inviterID",
          invites: {
            $sum: "$uses"
          }
        }
      }, _0x56f8c1, _0x2b172a, {
        $limit: 500
      }]).exec();
      global.leaderboardCache.invites = _0x4d9b5a.map(_0x5f55c3 => ({
        userId: _0x5f55c3._id,
        invites: _0x5f55c3.invites
      }));
      const _0x524bca = {
        $in: [..._0x5b87de]
      };
      const _0x3b06d7 = {
        $or: [{
          level: {
            $gt: 0
          }
        }, {
          xp: {
            $gt: 0
          }
        }],
        userId: _0x524bca
      };
      const _0x487c66 = {
        level: -1,
        xp: -1
      };
      const _0x4b9d = await UserData.find(_0x3b06d7).sort(_0x487c66).limit(500).exec();
      global.leaderboardCache.levels = _0x4b9d.map(_0x43674 => ({
        userId: _0x43674.userId,
        level: _0x43674.level,
        xp: _0x43674.xp
      }));
      const _0x250338 = {
        $in: [..._0x5b87de]
      };
      const _0x3f8f0e = {
        totalMessages: {
          $gt: 0
        },
        userId: _0x250338
      };
      const _0x285b6a = {
        totalMessages: -1
      };
      const _0x2dd032 = await UserData.find(_0x3f8f0e).sort(_0x285b6a).limit(500).exec();
      global.leaderboardCache.messages = _0x2dd032.map(_0x54b401 => ({
        userId: _0x54b401.userId,
        messages: _0x54b401.totalMessages
      }));
      global.leaderboardCache.lastUpdated = new Date();
    } catch (_0x2e6f30) {
      if (_0x2e6f30.name === "MongoNetworkTimeoutError") {
        console.error("Network timeout while connecting to MongoDB:", _0x2e6f30);
      } else {
        console.error("Failed to update leaderboard cache:", _0x2e6f30);
      }
    }
  };
  setInterval(() => _0x1b59c6(client), 300000);
  client.on("messageCreate", _0x4d8c3c);
  client.on("messageDelete", _0x26328e);
  client.on("presenceUpdate", _0x6d8f84);
  client.on("interactionCreate", async _0x8a7828 => _0x442720(_0x8a7828));
  client.on("messageUpdate", _0x249eef);
  client.on("guildMemberAdd", _0x203fb2);
  client.on("messageReactionAdd", _0x5e887c);
  client.on("messageReactionRemove", _0x4060e9);
  client.on("ready", _0x4d1aaf);
  client.on("error", _0x7ec0ef);
  client.on("warn", _0x497970);
  const _0xa88128 = [];
  const _0x5c9889 = new Set();
  const _0x122a8f = {};
  const _0x4f2e56 = new Map();
  function _0x1a7683(_0x16fed6, _0x12f990) {
    _0x122a8f[_0x16fed6] = _0x12f990;
  }
  function _0x54e569(_0x2c8fa2) {
    return parseInt(_0x2c8fa2.replace("#", ""), 16);
  }
  function _0x4d8c3c(_0xc41ab2) {
    if (_0xc41ab2.author.bot) {
      return;
    }
    if (_0xc41ab2.mentions.users.size) {
      if (!config.AntiGhostPing.Enabled) {
        return;
      }
      const _0x4a333a = _0x903189(_0xc41ab2.member, config.AntiGhostPing.BypassPerms, config.AntiGhostPing.BypassRoles);
      if (_0x4a333a) {
        return;
      }
      messageDeletions.set(_0xc41ab2.id, {
        timestamp: Date.now(),
        authorId: _0xc41ab2.author.id,
        mentions: _0xc41ab2.mentions.users.map(_0x3c612b => _0x3c612b.id)
      });
    }
    _0x498877(_0xc41ab2);
  }
  async function _0x498877(_0xa6fed3) {
    const _0x1c4bb5 = {
      channelId: _0xa6fed3.channel.id,
      status: "open"
    };
    const _0x37bafb = await Ticket.findOne(_0x1c4bb5);
    if (_0x37bafb && _0xa6fed3.author.id === _0x37bafb.userId) {
      _0x37bafb.alertTime = null;
      if (_0x37bafb.alertMessageId) {
        const _0x29260d = await _0xa6fed3.channel.messages.fetch(_0x37bafb.alertMessageId).catch(() => null);
        if (_0x29260d) {
          try {
            await _0x29260d.delete();
          } catch (_0x42295a) {
            if (_0x42295a.code !== 10008) {
              console.error("Failed to delete alert message:", _0x42295a);
            }
          }
        }
        _0x37bafb.alertMessageId = null;
      }
      await _0x37bafb.save();
    }
  }
  function _0x26328e(_0x2917ec) {
    if (!_0x2917ec.guild || _0x2917ec.author.bot) {
      return;
    }
    if (!client.snipes.has(_0x2917ec.guild.id)) {
      client.snipes.set(_0x2917ec.guild.id, new Collection());
    }
    const _0x45be73 = client.snipes.get(_0x2917ec.guild.id);
    _0x45be73.set(_0x2917ec.channel.id, {
      content: _0x2917ec.content,
      author: _0x2917ec.author.tag,
      member: _0x2917ec.member,
      timestamp: new Date()
    });
    if (messageDeletions.has(_0x2917ec.id)) {
      const _0x215eb3 = messageDeletions.get(_0x2917ec.id);
      const _0x5c13d6 = _0x1ed3e9(config.AntiGhostPing.TimeLimit);
      if (Date.now() - _0x215eb3.timestamp < _0x5c13d6) {
        const _0x22e021 = _0x2917ec.guild.members.cache.get(_0x215eb3.authorId);
        if (_0x22e021) {
          const _0xe35e65 = _0x1ed3e9(config.AntiGhostPing.TimeoutTime);
          _0x22e021.timeout(_0xe35e65, "Ghost Pinging (Auto Moderation)").catch(console.error);
          const _0x19c66f = _0x34436b("Auto Moderation", "#FF0000", "Ghost Ping Detected", "**User:** <@" + _0x215eb3.authorId + "> \n**Action:** Timeout", [{
            name: "Reason",
            value: "Ghost Pinging",
            inline: true
          }, {
            name: "Duration",
            value: _0x5207b9(_0xe35e65),
            inline: true
          }], "User ID: " + _0x215eb3.authorId);
          _0x47e6ff(_0x2917ec.guild, config.AntiGhostPing.LogsChannelID, _0x19c66f);
          if (config.AntiGhostPing.SendDM) {
            const _0x43fc56 = {
              guildName: _0x2917ec.guild.name,
              messageContent: _0x2917ec.content,
              timeoutDuration: _0x5207b9(_0xe35e65)
            };
            _0x4a482e(_0x22e021.user, config.AntiGhostPing.DirectMessage, _0x43fc56);
          }
        }
      }
      messageDeletions.delete(_0x2917ec.id);
    }
  }
  async function _0x6d8f84(_0x5204bc, _0x5ddd3b) {}
  function _0x35693e(_0x5a234b) {
    return async _0x51bf82 => {
      const _0x281cd = _0x5a234b.Reactions.find(_0x2bf574 => _0x2bf574.Emoji === _0x51bf82.customId);
      if (!_0x281cd) {
        return;
      }
      const _0x21de6f = _0x51bf82.guild.roles.cache.get(_0x281cd.RoleID);
      if (!_0x21de6f) {
        console.log("[REACTION ROLES] Role (" + _0x281cd.RoleID + ") not found in ReactionRoles.roleID");
        return;
      }
      const _0x33eac8 = _0x51bf82.guild.members.cache.get(_0x51bf82.user.id);
      try {
        if (!_0x51bf82.replied && !_0x51bf82.deferred) {
          await _0x51bf82.deferReply({
            ephemeral: true
          });
        }
        if (_0x33eac8.roles.cache.has(_0x21de6f.id)) {
          await _0x33eac8.roles.remove(_0x21de6f);
          const _0x44bfb5 = {
            content: "Removed the " + _0x281cd.Name + " role from you."
          };
          await _0x51bf82.editReply(_0x44bfb5);
        } else {
          await _0x33eac8.roles.add(_0x21de6f);
          const _0xf7799b = {
            content: "Added the " + _0x281cd.Name + " role to you."
          };
          await _0x51bf82.editReply(_0xf7799b);
        }
      } catch (_0xd26c86) {
        console.error(_0xd26c86);
      }
    };
  }
  Object.keys(config.ReactionRoles).forEach(_0x2b00df => {
    const _0x50e7d1 = config.ReactionRoles[_0x2b00df];
    if (_0x50e7d1.useButtons) {
      const _0x98ac17 = _0x35693e(_0x50e7d1);
      _0x1a7683(_0x2b00df, _0x98ac17);
    }
  });
  async function _0x442720(_0x4cae4b) {
    if (_0x4cae4b.isCommand()) {
      const _0x9eb7e0 = client.slashCommands.get(_0x4cae4b.commandName);
      if (!_0x9eb7e0) {
        return;
      }
      try {
        await _0x9eb7e0.execute(_0x4cae4b, client);
      } catch (_0x12a7fb) {
        console.error("[ERROR] Failed to execute command " + (_0x9eb7e0.id || _0x9eb7e0.name) + ":", _0x12a7fb);
        if (!_0x4cae4b.replied && !_0x4cae4b.deferred) {
          await _0x4cae4b.reply({
            content: "There was an error while executing this command!",
            ephemeral: true
          });
        } else if (_0x4cae4b.deferred) {
          await _0x4cae4b.followUp({
            content: "There was an error while executing this command!",
            ephemeral: true
          });
        }
      }
    } else if (_0x4cae4b.isButton()) {
      const _0x2dba1c = _0x4cae4b.user.id + "-" + _0x4cae4b.customId;
      if (_0x4f2e56.has(_0x2dba1c)) {
        clearTimeout(_0x4f2e56.get(_0x2dba1c));
      }
      _0x4f2e56.set(_0x2dba1c, setTimeout(async () => {
        try {
          if (!_0x4cae4b.replied && !_0x4cae4b.deferred) {
            if (_0x4cae4b.customId.startsWith("reaction_role_")) {
              await _0x59718e(_0x4cae4b);
            } else {
              for (const [_0xfdde6a, _0x2d5bdc] of Object.entries(_0x122a8f)) {
                await _0x2d5bdc(_0x4cae4b);
              }
              const _0x1fd15d = {
                "transactionLogs.interactionId": _0x4cae4b.message.interaction.id
              };
              const _0xa27e88 = await UserData.findOne(_0x1fd15d);
              if (_0x4cae4b.customId === "get_wallet_address") {
                if (_0xa27e88) {
                  const _0x5b3979 = {
                    content: "Wallet Address: `" + _0xa27e88.address + "`",
                    ephemeral: true
                  };
                  await _0x4cae4b.reply(_0x5b3979);
                } else {
                  await _0x4cae4b.reply({
                    content: "Wallet address not found.",
                    ephemeral: true
                  });
                }
              } else if (_0x4cae4b.customId === "show_qr_code") {
                if (_0xa27e88) {
                  const _0x118251 = {
                    content: "" + _0xa27e88.qrCodeURL,
                    ephemeral: true
                  };
                  await _0x4cae4b.reply(_0x118251);
                } else {
                  await _0x4cae4b.reply({
                    content: "QR code not found.",
                    ephemeral: true
                  });
                }
              }
            }
          } else {
            console.warn("Interaction " + _0x4cae4b.id + " has already been replied or deferred.");
          }
        } catch (_0x596dc9) {} finally {
          _0x4f2e56.delete(_0x2dba1c);
        }
      }, 100));
    } else if (_0x4cae4b.isStringSelectMenu()) {
      if (_0x4cae4b.customId.startsWith("reaction_role_")) {
        await _0xba5eb9(_0x4cae4b);
      }
    }
  }
  async function _0x59718e(_0x5cad48) {
    const [,, _0x1deee3, _0x4d5afb] = _0x5cad48.customId.split("_");
    const _0x529f64 = config.ReactionRoles[_0x1deee3];
    if (!_0x529f64) {
      return;
    }
    const _0x4e97b1 = _0x529f64.Reactions[parseInt(_0x4d5afb)];
    if (!_0x4e97b1) {
      return;
    }
    const _0x2c486f = _0x5cad48.member;
    const _0x978105 = _0x5cad48.guild.roles.cache.get(_0x4e97b1.RoleID);
    if (!_0x978105) {
      console.log("[REACTION ROLES] Role (" + _0x4e97b1.RoleID + ") not found in ReactionRoles.roleID");
      return;
    }
    try {
      if (_0x2c486f.roles.cache.has(_0x978105.id)) {
        await _0x2c486f.roles.remove(_0x978105);
        const _0x56aeba = {
          content: "Removed the " + _0x4e97b1.Name + " role from you.",
          ephemeral: true
        };
        await _0x5cad48.reply(_0x56aeba);
      } else {
        await _0x2c486f.roles.add(_0x978105);
        const _0x247104 = {
          content: "Added the " + _0x4e97b1.Name + " role to you.",
          ephemeral: true
        };
        await _0x5cad48.reply(_0x247104);
      }
    } catch (_0x53b50d) {
      console.error(_0x53b50d);
      await _0x5cad48.reply({
        content: "There was an error while updating your roles.",
        ephemeral: true
      });
    }
  }
  async function _0xba5eb9(_0x4c09ef) {
    const _0x499bd3 = _0x4c09ef.customId.split("_")[2];
    const _0x3a092d = config.ReactionRoles[_0x499bd3];
    if (!_0x3a092d) {
      return;
    }
    const _0x190761 = _0x4c09ef.member;
    const _0x142321 = _0x4c09ef.values;
    const _0x3d1a6f = _0x3a092d.Reactions.map((_0xeb3ea1, _0x47f64f) => ({
      roleId: _0xeb3ea1.RoleID,
      value: _0x499bd3 + "_" + _0x47f64f
    }));
    try {
      for (const {
        roleId: _0xd8b75f,
        value: _0x5d9424
      } of _0x3d1a6f) {
        const _0x473431 = _0x4c09ef.guild.roles.cache.get(_0xd8b75f);
        if (!_0x473431) {
          console.log("[REACTION ROLES] Role (" + _0xd8b75f + ") not found in guild");
          continue;
        }
        if (_0x142321.includes(_0x5d9424)) {
          if (!_0x190761.roles.cache.has(_0xd8b75f)) {
            await _0x190761.roles.add(_0xd8b75f);
          }
        } else if (_0x190761.roles.cache.has(_0xd8b75f)) {
          await _0x190761.roles.remove(_0xd8b75f);
        }
      }
      await _0x4c09ef.reply({
        content: "Your roles have been updated!",
        ephemeral: true
      });
    } catch (_0x3aa6fe) {
      console.error("Error updating roles:", _0x3aa6fe);
      await _0x4c09ef.reply({
        content: "There was an error while updating your roles.",
        ephemeral: true
      });
    }
  }
  const _0xc61e6 = new Set();
  async function _0x5e887c(_0x316e1f, _0x34bd9b) {
    if (_0x34bd9b.bot) {
      return;
    }
    const _0x2a408f = Object.values(config.ReactionRoles).find(_0x11ca71 => _0x11ca71.ChannelID === _0x316e1f.message.channel.id);
    if (!_0x2a408f || _0x2a408f.useButtons) {
      return;
    }
    const _0x16a280 = _0x316e1f.emoji.id ? "<" + (_0x316e1f.emoji.animated ? "a" : "") + ":" + _0x316e1f.emoji.name + ":" + _0x316e1f.emoji.id + ">" : _0x316e1f.emoji.name;
    const _0x4e9792 = _0x2a408f.Reactions.find(_0x408ce8 => _0x408ce8.Emoji === _0x16a280);
    if (!_0x4e9792) {
      return;
    }
    const _0x3cab15 = _0x316e1f.message.guild.roles.cache.get(_0x4e9792.RoleID);
    if (!_0x3cab15) {
      console.log("[REACTION ROLES] Role (" + _0x4e9792.RoleID + ") not found in ReactionRoles.roleID");
      return;
    }
    const _0x5d1cff = _0x316e1f.message.guild.members.cache.get(_0x34bd9b.id);
    if (_0x5d1cff.roles.cache.has(_0x3cab15.id)) {
      await _0x5d1cff.roles.remove(_0x3cab15).catch(console.error);
    } else {
      await _0x5d1cff.roles.add(_0x3cab15).catch(console.error);
    }
    if (_0x2a408f.resetReacts) {
      _0xc61e6.add(_0x316e1f.message.id + "-" + _0x34bd9b.id);
      await _0x316e1f.users.remove(_0x34bd9b).catch(console.error);
      _0xc61e6.delete(_0x316e1f.message.id + "-" + _0x34bd9b.id);
    }
  }
  async function _0x4060e9(_0x25da78, _0x3dfab7) {
    if (_0x3dfab7.bot) {
      return;
    }
    const _0x5eab12 = Object.values(config.ReactionRoles).find(_0x3505bd => _0x3505bd.ChannelID === _0x25da78.message.channel.id);
    if (!_0x5eab12 || _0x5eab12.useButtons) {
      return;
    }
    const _0x5c9bb2 = _0x25da78.emoji.id ? "<" + (_0x25da78.emoji.animated ? "a" : "") + ":" + _0x25da78.emoji.name + ":" + _0x25da78.emoji.id + ">" : _0x25da78.emoji.name;
    const _0x27ecdc = _0x5eab12.Reactions.find(_0x1671ea => _0x1671ea.Emoji === _0x5c9bb2);
    if (!_0x27ecdc) {
      return;
    }
    const _0x4585f5 = _0x25da78.message.guild.roles.cache.get(_0x27ecdc.RoleID);
    if (!_0x4585f5) {
      console.log("[REACTION ROLES] Role (" + _0x27ecdc.RoleID + ") not found in ReactionRoles.roleID");
      return;
    }
    if (_0xc61e6.has(_0x25da78.message.id + "-" + _0x3dfab7.id)) {
      return;
    }
  }
  function _0x249eef(_0x4e85c7, _0x4f54aa) {
    if (!_0x4e85c7.guild || _0x4e85c7.author.bot) {
      return;
    }
    if (_0x4e85c7.content === _0x4f54aa.content) {
      return;
    }
    if (!client.snipes.has(_0x4e85c7.guild.id)) {
      client.snipes.set(_0x4e85c7.guild.id, new Collection());
    }
    const _0x162cf8 = client.snipes.get(_0x4e85c7.guild.id);
    _0x162cf8.set(_0x4e85c7.channel.id, {
      oldContent: _0x4e85c7.content,
      newContent: _0x4f54aa.content,
      author: _0x4e85c7.author.tag,
      member: _0x4e85c7.member,
      timestamp: new Date(),
      edited: true
    });
  }
  function _0x203fb2(_0x525e28) {
    const _0x20c0a8 = config.AutoKick;
    if (!_0x20c0a8.Enabled || _0x525e28.user.bot) {
      return;
    }
    const _0x4b20ab = _0x20c0a8.Role;
    const _0x37942d = _0x19ac8a(_0x20c0a8.Time);
    setTimeout(async () => {
      try {
        _0x525e28 = await _0x525e28.guild.members.fetch(_0x525e28.id);
        if (!_0x525e28) {
          return;
        }
        const _0x236ada = _0x4b20ab.some(_0x503389 => _0x525e28.roles.cache.has(_0x503389));
        if (!_0x236ada) {
          if (_0x20c0a8.DM.Enabled) {
            const _0x347585 = new EmbedBuilder().setTitle(_0x20c0a8.DM.Embed.Title).setDescription(_0x20c0a8.DM.Embed.Description.join("\n")).setColor(_0x20c0a8.DM.Embed.Color).setFooter({
              text: _0x20c0a8.DM.Embed.Footer
            });
            const _0x29fe20 = {
              embeds: [_0x347585]
            };
            await _0x525e28.send(_0x29fe20).catch(_0x58ffcc => {
              if (_0x58ffcc.code !== 50007) {}
            });
          }
          await _0x525e28.kick("Auto-Kick: Failed to acquire the required role in time.");
        }
      } catch (_0x1cddfa) {
        console.error("Failed to process auto-kick for " + _0x525e28.displayName + ": " + _0x1cddfa);
      }
    }, _0x37942d);
  }
  async function _0x1df013(_0x26a617) {
    _0x26a617.guilds.cache.forEach(_0x4e24f7 => {
      _0x4e24f7.channels.cache.forEach(_0x590272 => {
        if (_0x590272.type === ChannelType.GuildVoice) {
          _0x590272.members.forEach(_0x111ecf => {
            if (!_0x111ecf.user.bot) {
              handleVoiceXP(_0x111ecf);
            }
          });
        }
      });
    });
  }
  async function _0x4d1aaf() {
    try {
      await _0x1fb696();
      _0x5bc630();
      await _0x5ee47b();
      _0x211be8();
    } catch (_0x414caa) {
      console.error("Error during bot initialization:", _0x414caa);
    }
  }
  async function _0x1fb696() {
    await _0x1b59c6(client);
    await _0x143d10();
    if (config.ReactionRoles.Enabled) {
      await _0x45a328();
    }
    await _0x41390d();
    await _0xccd21e(client);
  }
  function _0x5bc630() {
    const _0x2df9dc = {
      condition: true,
      fn: _0x49157e,
      name: "Tempban"
    };
    const _0x186a11 = {
      condition: commandConfig.giveaway,
      fn: startGiveawayScheduler,
      name: "Giveaway"
    };
    const _0x2251fb = {
      condition: config.AFK.Enabled,
      fn: startAfkScheduler,
      name: "AFK"
    };
    const _0x40a3f2 = {
      condition: config.Twitch.Enabled,
      fn: _0x4f3e0d,
      name: "Twitch"
    };
    const _0x506206 = {
      condition: true,
      fn: _0x517699,
      name: "Interest"
    };
    const _0x10a55b = [_0x2df9dc, _0x186a11, _0x2251fb, _0x40a3f2, {
      condition: config.Alert?.Enabled,
      fn: () => startAlertScheduler(client),
      name: "Alert"
    }, {
      condition: config.TicketSettings.Enabled,
      fn: () => setInterval(() => _0x5e5182(client), 300000),
      name: "Ticket"
    }, _0x506206];
    _0x10a55b.forEach(({
      condition: _0x337043,
      fn: _0x49e80a,
      name: _0x1c44ba
    }) => {
      if (_0x337043) {
        _0x49e80a();
      }
    });
    setInterval(() => _0x5e8034(client), 30000);
    setInterval(_0x5d7f30, 12500);
    setInterval(_0xa5f114, 300000);
  }
  async function _0x5ee47b() {
    const _0x25a865 = await client.application.commands.fetch();
    for (const _0x4d64e5 of _0x25a865.values()) {
      await client.application.commands.delete(_0x4d64e5.id);
    }
    const _0x53ce1a = new REST({
      version: "10"
    }).setToken(config.BotToken);
    try {
      const _0x362c64 = {
        body: _0xa88128
      };
      const _0x4f9597 = await _0x53ce1a.put(Routes.applicationGuildCommands(client.user.id, config.GuildID), _0x362c64);
      _0x4f9597.forEach(_0x2f7192 => {
        const _0x203315 = client.slashCommands.get(_0x2f7192.name);
        if (_0x203315) {
          _0x203315.id = _0x2f7192.id;
        }
      });
      client.commandsReady = true;
    } catch (_0x1fc1fe) {
      console.error(colors.red("[ERROR]") + " Failed to register slash commands:", _0x1fc1fe);
      _0x5d6c37(_0x1fc1fe);
    }
  }
  function _0x211be8() {
    const _0x2377d6 = process.version;
    const _0x33efde = packageJson.version;
    const _0x3317bd = moment().format("HH:mm (DD-MM-YYYY)");
    const _0x2b51ed = _0x3317bd + " - Bot started up - Node.js " + _0x2377d6 + " - App Version " + _0x33efde + "\n";
    fs.appendFile("logs.txt", _0x2b51ed, _0x1e971f => {
      if (_0x1e971f) {
        console.error("Failed to write to log file:", _0x1e971f);
      }
    });
  }
  function _0x5d6c37(_0x236ee1) {
    fs.appendFileSync("logs.txt", new Date().toISOString() + " - ERROR: " + JSON.stringify(_0x236ee1, null, 2) + "\n");
    if (_0x236ee1.message.includes("application.commands scope")) {
      console.error(colors.red("[ERROR]") + " Application.commands scope wasn't selected when inviting the bot.");
      console.error(colors.red("[ERROR]") + " Invite the bot using the following URL:");
      console.error("" + colors.red("[ERROR] https://discord.com/api/oauth2/authorize?client_id=" + client.user.id + "&permissions=8&scope=bot%20applications.commands"));
    }
  }
  async function _0x143d10() {
    const _0x4bbedb = client.guilds.cache;
    for (const [_0x420b46, _0x150395] of _0x4bbedb) {
      try {
        const _0x8e10d4 = await _0x150395.members.fetch();
        const _0x417452 = new Set(_0x8e10d4.map(_0x39e30f => _0x39e30f.id));
        const _0x5c3e7e = {
          guildID: _0x420b46
        };
        let _0x2a1038 = await GuildData.findOne(_0x5c3e7e);
        if (!_0x2a1038) {
          const _0x2409f5 = {
            guildID: _0x420b46,
            members: []
          };
          _0x2a1038 = new GuildData(_0x2409f5);
        }
        const _0x316c79 = new Set(_0x2a1038.members);
        const _0x36c4a8 = [..._0x316c79].filter(_0x9ab47 => !_0x417452.has(_0x9ab47));
        for (const _0x21302f of _0x36c4a8) {
          await _0x239381(_0x150395, _0x21302f);
        }
        await _0xaa9137(_0x2a1038, _0x417452);
      } catch (_0x2bf3f3) {
        console.error("Error checking for left members in guild " + _0x420b46 + ":", _0x2bf3f3);
      }
    }
  }
  async function _0x239381(_0x35210f, _0x188cdf) {
    const _0xc78105 = await _0x35210f.members.fetch(_0x188cdf).catch(() => null);
    if (_0xc78105) {
      await sendLeaveMessage(_0xc78105);
      await updateInviteUsage(_0xc78105);
    }
  }
  async function _0xaa9137(_0x579cfb, _0x3b1e1d) {
    _0x579cfb.members = [..._0x3b1e1d];
    await _0x579cfb.save();
  }
  function _0x7ec0ef(_0x44d486) {
    fs.appendFile("logs.txt", new Date().toISOString() + " - ERROR: " + _0x44d486 + "\n", _0x4ddf6c => {
      if (_0x4ddf6c) {
        console.error("Failed to write to log file:", _0x4ddf6c);
      }
    });
  }
  function _0x497970(_0x9c435c) {
    fs.appendFile("logs.txt", new Date().toISOString() + " - WARN: " + _0x9c435c + "\n", _0x264e22 => {
      if (_0x264e22) {
        console.error("Failed to write to log file:", _0x264e22);
      }
    });
  }
  function _0x903189(_0x36c98f, _0x46c723, _0x15f1df) {
    return _0x46c723.some(_0x8ffbdb => _0x36c98f.permissions.has(_0x8ffbdb)) || _0x15f1df.some(_0xa68e6f => _0x36c98f.roles.cache.has(_0xa68e6f));
  }
  function _0x3d0401(_0x340757) {
    const _0x51049a = /(\d+)([smhd])/g;
    let _0x38a710;
    let _0x39909e = 0;
    while ((_0x38a710 = _0x51049a.exec(_0x340757)) !== null) {
      const _0x4399f1 = parseInt(_0x38a710[1], 10);
      const _0x4b10a1 = _0x38a710[2];
      switch (_0x4b10a1) {
        case "s":
          _0x39909e += _0x4399f1 * 1000;
          break;
        case "m":
          _0x39909e += _0x4399f1 * 60 * 1000;
          break;
        case "h":
          _0x39909e += _0x4399f1 * 60 * 60 * 1000;
          break;
        case "d":
          _0x39909e += _0x4399f1 * 24 * 60 * 60 * 1000;
          break;
        default:
          break;
      }
    }
    return _0x39909e;
  }
  function _0x1ed3e9(_0x399138) {
    const _0x3ba660 = {
      s: 1000,
      m: 60000,
      h: 3600000,
      d: 86400000
    };
    return _0x399138.split(" ").reduce((_0x4b6ee2, _0x18ad80) => {
      const _0xc67c65 = _0x18ad80.slice(-1);
      const _0x250668 = parseInt(_0x18ad80.slice(0, -1), 10);
      return _0x4b6ee2 + _0x250668 * (_0x3ba660[_0xc67c65] || 0);
    }, 0);
  }
  function _0x34436b(_0x3aec46, _0xcc34de, _0x4c990b, _0x57ffc7, _0x5b0bc5, _0x155420) {
    const _0x3ca705 = {
      name: _0x3aec46
    };
    const _0x1b0529 = {
      text: _0x155420
    };
    return new EmbedBuilder().setAuthor(_0x3ca705).setColor(_0xcc34de).setTitle(_0x4c990b).setDescription(_0x57ffc7).addFields(_0x5b0bc5).setTimestamp().setFooter(_0x1b0529);
  }
  function _0x5207b9(_0x562b96) {
    if (_0x562b96 < 1000) {
      return "Less than a second";
    }
    let _0x435e3e = Math.floor(_0x562b96 / 1000);
    let _0x575ee3 = Math.floor(_0x435e3e / 60);
    let _0x5f176 = Math.floor(_0x575ee3 / 60);
    let _0x2c2385 = Math.floor(_0x5f176 / 24);
    let _0x2bfccd = Math.floor(_0x2c2385 / 7);
    let _0x45bfd4 = Math.floor(_0x2c2385 / 30);
    let _0x5a018c = Math.floor(_0x2c2385 / 365);
    _0x435e3e %= 60;
    _0x575ee3 %= 60;
    _0x5f176 %= 24;
    _0x2c2385 %= 7;
    _0x2bfccd %= 4;
    _0x45bfd4 %= 12;
    let _0x4b75d1 = "";
    if (_0x5a018c > 0) {
      _0x4b75d1 += _0x5a018c + " year" + (_0x5a018c > 1 ? "s" : "") + ", ";
    }
    if (_0x45bfd4 > 0) {
      _0x4b75d1 += _0x45bfd4 + " month" + (_0x45bfd4 > 1 ? "s" : "") + ", ";
    }
    if (_0x2bfccd > 0) {
      _0x4b75d1 += _0x2bfccd + " week" + (_0x2bfccd > 1 ? "s" : "") + ", ";
    }
    if (_0x2c2385 > 0) {
      _0x4b75d1 += _0x2c2385 + " day" + (_0x2c2385 > 1 ? "s" : "") + ", ";
    }
    if (_0x5f176 > 0) {
      _0x4b75d1 += _0x5f176 + " hour" + (_0x5f176 > 1 ? "s" : "") + ", ";
    }
    if (_0x575ee3 > 0) {
      _0x4b75d1 += _0x575ee3 + " minute" + (_0x575ee3 > 1 ? "s" : "") + ", ";
    }
    if (_0x435e3e > 0) {
      _0x4b75d1 += _0x435e3e + " second" + (_0x435e3e > 1 ? "s" : "");
    }
    return _0x4b75d1.replace(/,\s*$/, "");
  }
  function _0x47e6ff(_0x4d9ed2, _0x2af0f7, _0x44031e) {
    const _0x4726d6 = _0x4d9ed2.channels.cache.get(_0x2af0f7);
    if (_0x4726d6) {
      const _0x3371c1 = {
        embeds: [_0x44031e]
      };
      _0x4726d6.send(_0x3371c1);
    }
  }
  async function _0x4a482e(_0x2036e8, _0x56e454, _0xc4ffac) {
    let _0x38ad63 = _0x56e454.replace(/{user}/g, _0x2036e8.username).replace(/{guildname}/g, _0xc4ffac.guildName).replace(/{message}/g, _0xc4ffac.messageContent).replace(/{time}/g, _0xc4ffac.timeoutDuration);
    try {
      await _0x2036e8.send(_0x38ad63);
    } catch (_0x12e099) {
      console.log("Could not send DM to " + _0x2036e8.username + ": " + _0x12e099);
    }
  }
  async function _0x5e8034(_0x25016f) {
    try {
      const _0x9a99e4 = await ChannelStat.find({});
      for (const _0x22b4e4 of _0x9a99e4) {
        const _0x55c7a9 = _0x25016f.guilds.cache.get(_0x22b4e4.guildId);
        if (!_0x55c7a9) {
          console.log("Guild not found for stat: " + _0x22b4e4.type);
          continue;
        }
        const _0x1a006a = _0x55c7a9.channels.cache.get(_0x22b4e4.channelId);
        if (!_0x1a006a || _0x1a006a.type !== ChannelType.GuildVoice) {
          console.log("Channel not found or not a voice channel: " + _0x22b4e4.channelId);
          continue;
        }
        let _0x401726;
        switch (_0x22b4e4.type) {
          case "MemberCount":
            _0x401726 = _0x55c7a9.memberCount.toString();
            break;
          case "NitroBoosterCount":
            _0x401726 = _0x55c7a9.premiumSubscriptionCount.toString();
            break;
          case "ServerCreationDate":
            _0x401726 = _0x55c7a9.createdAt.toDateString();
            break;
          case "TotalRolesCount":
            _0x401726 = _0x55c7a9.roles.cache.size.toString();
            break;
          case "TotalEmojisCount":
            _0x401726 = _0x55c7a9.emojis.cache.size.toString();
            break;
          case "TotalChannelsCount":
            _0x401726 = _0x55c7a9.channels.cache.size.toString();
            break;
          case "OnlineMembersCount":
            const _0x42ad4f = ["online", "dnd", "idle"];
            _0x401726 = _0x55c7a9.members.cache.filter(_0x41697e => _0x42ad4f.includes(_0x41697e.presence?.status) && !_0x41697e.user.bot).size.toString();
            break;
          case "ServerRegion":
            _0x401726 = _0x55c7a9.preferredLocale;
            break;
          case "TotalBannedMembers":
            const _0x11464d = await _0x55c7a9.bans.fetch();
            _0x401726 = _0x11464d.size.toString();
            break;
          case "TotalMembersWithRole":
            if (_0x22b4e4.roleId) {
              const _0x44ccc2 = _0x55c7a9.roles.cache.get(_0x22b4e4.roleId);
              _0x401726 = _0x44ccc2 ? _0x44ccc2.members.size.toString() : "Role not found";
            } else {
              _0x401726 = "No role specified";
            }
            break;
          case "OnlineMembersWithRole":
            if (_0x22b4e4.roleId) {
              const _0x823f17 = _0x55c7a9.roles.cache.get(_0x22b4e4.roleId);
              if (_0x823f17) {
                const _0x18af75 = _0x823f17.members.filter(_0x5de1ff => ["online", "dnd", "idle"].includes(_0x5de1ff.presence?.status) && !_0x5de1ff.user.bot);
                _0x401726 = _0x18af75.size.toString();
              } else {
                _0x401726 = "Role not found";
              }
            } else {
              _0x401726 = "No role specified";
            }
            break;
          default:
            console.log("Unknown stat type: " + _0x22b4e4.type);
            continue;
        }
        const _0x40e4d0 = _0x22b4e4.channelName.replace("{stats}", _0x401726);
        if (_0x1a006a.name !== _0x40e4d0) {
          try {
            await _0x1a006a.setName(_0x40e4d0);
          } catch (_0x40d236) {
            console.error("Error updating channel " + _0x1a006a.id + ":", _0x40d236);
          }
        }
      }
    } catch (_0x1bcda6) {
      console.error("Error in updateChannelStats:", _0x1bcda6);
    }
  }
  function _0x47816e(_0x6b0ed0) {
    const _0xbbc480 = fs.readdirSync(_0x6b0ed0, {
      withFileTypes: true
    });
    const _0x2f9bcb = new Set();
    const _0x4bb9df = [];
    for (const _0x170ed6 of _0xbbc480) {
      const _0x1374ba = path.join(_0x6b0ed0, _0x170ed6.name);
      if (_0x170ed6.isDirectory()) {
        _0x47816e(_0x1374ba);
      } else if (_0x170ed6.isFile() && _0x170ed6.name.endsWith(".js")) {
        try {
          const _0x5b33fb = require(_0x1374ba);
          if (_0x5b33fb.data instanceof SlashCommandBuilder) {
            const _0x2d3749 = _0x5b33fb.data.name;
            if (_0x2f9bcb.has(_0x2d3749)) {
              _0x4bb9df.push(_0x2d3749);
            } else {
              _0x2f9bcb.add(_0x2d3749);
              if (commandConfig[_0x2d3749]) {
                _0xa88128.push(_0x5b33fb.data.toJSON());
                client.slashCommands.set(_0x2d3749, _0x5b33fb);
              } else {}
            }
          }
        } catch (_0x3bbe28) {
          console.error(colors.red("[ERROR]") + " Error loading " + _0x170ed6.name + ":", _0x3bbe28);
        }
      }
    }
    if (_0x4bb9df.length > 0) {
      console.error(colors.red("[ERROR]") + " Duplicate command names detected:", _0x4bb9df.join(", "));
    }
  }
  _0x47816e(path.join(__dirname, "commands"));
  glob("./addons/**/*.js", function (_0x5014ac, _0x145431) {
    if (_0x5014ac) {
      return console.error(_0x5014ac);
    }
    const _0x208ed2 = [];
    _0x145431.forEach(_0x1e2af5 => {
      if (_0x1e2af5.endsWith(".js")) {
        const _0x374273 = _0x1e2af5.match(/\/addons\/([^/]+)/)[1];
        if (!_0x208ed2.includes(_0x374273)) {
          _0x208ed2.push(_0x374273);
        }
        try {
          if (_0x1e2af5.search("cmd_") >= 0) {
            let _0x1f7de5 = require(_0x1e2af5);
            if (_0x1f7de5 && _0x1f7de5.data && _0x1f7de5.data.toJSON && typeof _0x1f7de5.data.toJSON === "function") {
              _0xa88128.push(_0x1f7de5.data.toJSON());
              client.slashCommands.set(_0x1f7de5.data.name, _0x1f7de5);
            }
          } else {
            let _0x5353b7 = require(_0x1e2af5);
            if (_0x5353b7 && _0x5353b7.run && typeof _0x5353b7.run === "function") {
              _0x5353b7.run(client);
            }
          }
        } catch (_0x5b1ccb) {
          console.error("" + colors.red("[ERROR] " + _0x374273 + ": " + _0x5b1ccb.message));
          console.error(_0x5b1ccb.stack);
        }
      }
    });
  });
  const _0x2c181c = {
    PRIMARY: ButtonStyle.Primary,
    SECONDARY: ButtonStyle.Secondary,
    SUCCESS: ButtonStyle.Success,
    DANGER: ButtonStyle.Danger,
    LINK: ButtonStyle.Link
  };
  const _0x83b840 = _0x2c181c;
  async function _0x45a328() {
    if (!config.ReactionRoles.Enabled) {
      console.log("Reaction Roles are disabled in config");
      return;
    }
    for (const _0x4e6e10 in config.ReactionRoles) {
      if (_0x4e6e10 === "Enabled") {
        continue;
      }
      const _0xe496d3 = config.ReactionRoles[_0x4e6e10];
      if (!_0xe496d3) {
        console.log("Panel " + _0x4e6e10 + " is undefined in config");
        continue;
      }
      if (!_0xe496d3.ChannelID) {
        console.log("Channel ID not specified for panel: " + _0x4e6e10);
        continue;
      }
      let _0x12c7d3;
      try {
        _0x12c7d3 = await client.channels.fetch(_0xe496d3.ChannelID);
      } catch (_0x42b79f) {
        console.error("Error fetching channel for panel " + _0x4e6e10 + ":", _0x42b79f);
        continue;
      }
      if (!_0x12c7d3) {
        console.log("Channel not found for panel: " + _0x4e6e10 + " (ID: " + _0xe496d3.ChannelID + ")");
        continue;
      }
      const _0xaed292 = _0xe496d3.Embed.Description.map(_0x293097 => _0x293097.trim()).join("\n");
      const _0x5da203 = new EmbedBuilder().setDescription(_0xaed292);
      if (_0xe496d3.Embed.Title) {
        _0x5da203.setTitle(_0xe496d3.Embed.Title);
      }
      if (_0xe496d3.Embed.Footer.Text) {
        _0x5da203.setFooter({
          text: _0xe496d3.Embed.Footer.Text,
          iconURL: _0xe496d3.Embed.Footer.Icon || undefined
        });
      }
      if (_0xe496d3.Embed.Author.Text) {
        _0x5da203.setAuthor({
          name: _0xe496d3.Embed.Author.Text,
          iconURL: _0xe496d3.Embed.Author.Icon || undefined
        });
      }
      if (_0xe496d3.Embed.Color) {
        _0x5da203.setColor(_0xe496d3.Embed.Color);
      }
      if (_0xe496d3.Embed.Image) {
        _0x5da203.setImage(_0xe496d3.Embed.Image);
      }
      if (_0xe496d3.Embed.Thumbnail) {
        _0x5da203.setThumbnail(_0xe496d3.Embed.Thumbnail);
      }
      let _0xca3f80;
      if (_0xe496d3.type === "BUTTON") {
        const _0x49db4c = [];
        let _0x2f2cca = new ActionRowBuilder();
        let _0x5e97a6 = 0;
        _0xe496d3.Reactions.forEach((_0x4a996c, _0x181fee) => {
          if (_0x5e97a6 >= 25) {
            console.error("Exceeded the button limit for panel: " + _0x4e6e10 + ". Maximum 25 buttons are allowed.");
            return;
          }
          const _0x3b1a4f = _0x83b840[_0x4a996c.Style.toUpperCase()] || ButtonStyle.Secondary;
          const _0x178199 = new ButtonBuilder().setCustomId("reaction_role_" + _0x4e6e10 + "_" + _0x181fee).setLabel(_0x4a996c.Description).setStyle(_0x3b1a4f).setEmoji(_0x4a996c.Emoji);
          _0x2f2cca.addComponents(_0x178199);
          _0x5e97a6++;
          if (_0x2f2cca.components.length === 5) {
            _0x49db4c.push(_0x2f2cca);
            _0x2f2cca = new ActionRowBuilder();
          }
        });
        if (_0x2f2cca.components.length > 0) {
          _0x49db4c.push(_0x2f2cca);
        }
        const _0x98171d = {
          embeds: [_0x5da203],
          components: _0x49db4c
        };
        _0xca3f80 = await _0x12c7d3.send(_0x98171d);
      } else if (_0xe496d3.type === "REACT") {
        const _0x14a186 = {
          embeds: [_0x5da203]
        };
        _0xca3f80 = await _0x12c7d3.send(_0x14a186);
        for (const _0x3d669e of _0xe496d3.Reactions) {
          await _0xca3f80.react(_0x3d669e.Emoji);
        }
      } else if (_0xe496d3.type === "SELECT") {
        const _0x120c29 = new StringSelectMenuBuilder().setCustomId("reaction_role_" + _0x4e6e10).setPlaceholder("Select your roles").setMinValues(0).setMaxValues(_0xe496d3.Reactions.length);
        _0xe496d3.Reactions.forEach((_0x2ddcb4, _0x1c12a3) => {
          const _0x7630d0 = {
            label: _0x2ddcb4.Name,
            description: _0x2ddcb4.Description,
            value: _0x4e6e10 + "_" + _0x1c12a3,
            emoji: _0x2ddcb4.Emoji
          };
          _0x120c29.addOptions(_0x7630d0);
        });
        const _0x3505eb = new ActionRowBuilder().addComponents(_0x120c29);
        const _0x576ca4 = {
          embeds: [_0x5da203],
          components: [_0x3505eb]
        };
        _0xca3f80 = await _0x12c7d3.send(_0x576ca4);
      }
      if (_0xca3f80) {
        const _0x101093 = {
          panelName: _0x4e6e10
        };
        const _0x246afe = {
          panelName: _0x4e6e10,
          channelID: _0xe496d3.ChannelID,
          messageID: _0xca3f80.id
        };
        await ReactionRole.findOneAndUpdate(_0x101093, _0x246afe, {
          upsert: true,
          new: true
        });
      } else {
        console.log("Failed to create reaction role panel for " + _0x4e6e10);
      }
    }
  }
  async function _0x4f3e0d() {
    const {
      AnnouncementChannelID: _0x1a7427,
      AssignRole: _0x2f6da8
    } = config.Twitch;
    let _0x1ab5f0;
    try {
      _0x1ab5f0 = client.channels.cache.get(_0x1a7427);
      if (!_0x1ab5f0) {
        throw new Error("Announcement channel with ID " + _0x1a7427 + " not found.");
      }
      const _0x26f69f = await _0x24a82f();
      if (!_0x26f69f) {
        throw new Error("Failed to obtain Twitch access token.");
      }
      const _0x4e4d46 = await TwitchStreamers.find();
      for (const _0x53832b of _0x4e4d46) {
        try {
          const _0x1eb5af = await _0x53070f(_0x53832b.name, _0x26f69f);
          let _0x991bbb;
          if (_0x53832b.discordUserId) {
            _0x991bbb = await _0x1ab5f0.guild.members.fetch(_0x53832b.discordUserId).catch(_0x739016 => {
              console.error("Error fetching guild member for " + _0x53832b.name + ":", _0x739016);
            });
          }
          if (!_0x1eb5af) {
            if (_0x5c9889.has(_0x53832b.name) && _0x991bbb && _0x991bbb.roles.cache.has(_0x2f6da8)) {
              await _0x991bbb.roles.remove(_0x2f6da8);
            }
            _0x5c9889.delete(_0x53832b.name);
            continue;
          }
          if (_0x5c9889.has(_0x53832b.name)) {
            continue;
          }
          await _0x29286c(_0x1ab5f0, _0x53832b, _0x1eb5af, _0x26f69f);
          if (_0x991bbb && !_0x991bbb.roles.cache.has(_0x2f6da8)) {
            await _0x991bbb.roles.add(_0x2f6da8).catch(_0x5a790d => {
              console.error("Error adding role to member for " + _0x53832b.name + ":", _0x5a790d);
            });
          }
          _0x5c9889.add(_0x53832b.name);
        } catch (_0x143abc) {
          console.error("Error processing stream for " + _0x53832b.name + ":", _0x143abc);
        }
      }
    } catch (_0x209c42) {
      console.error("Error in announceTwitchStreams function:", _0x209c42);
    }
  }
  async function _0x24a82f() {
    try {
      const _0x4fc692 = {
        client_id: config.Twitch.ClientID,
        client_secret: config.Twitch.ClientSecret,
        grant_type: "client_credentials"
      };
      const _0x4dc67b = {
        params: _0x4fc692
      };
      const _0x51ea08 = await axios.post("https://id.twitch.tv/oauth2/token", null, _0x4dc67b);
      return _0x51ea08.data.access_token;
    } catch (_0xa256e4) {
      console.error("Error fetching Twitch token:", _0xa256e4.response ? _0xa256e4.response.data : _0xa256e4.message);
      return null;
    }
  }
  async function _0x10f866(_0x1c9996, _0x1208f4) {
    try {
      const _0x43412d = {
        "Client-ID": config.Twitch.ClientID,
        Authorization: "Bearer " + _0x1208f4
      };
      const _0x52ead1 = {
        headers: _0x43412d
      };
      const _0x8d291e = await axios.get("https://api.twitch.tv/helix/games?id=" + _0x1c9996, _0x52ead1);
      const _0x25f35b = _0x8d291e.data.data[0];
      if (_0x25f35b) {
        const _0x1a3805 = _0x25f35b.box_art_url.replace("{width}", "144").replace("{height}", "192");
        return _0x1a3805;
      }
      return null;
    } catch (_0x3a605a) {
      console.error("Error fetching game icon for game ID: " + _0x1c9996, _0x3a605a);
      return null;
    }
  }
  async function _0x4fc94e(_0x5ed343, _0x3db4bb) {
    try {
      const _0x5f2436 = {
        "Client-ID": config.Twitch.ClientID,
        Authorization: "Bearer " + _0x3db4bb
      };
      const _0xc7b901 = {
        headers: _0x5f2436
      };
      const _0x61afdb = await axios.get("https://api.twitch.tv/helix/users?id=" + _0x5ed343, _0xc7b901);
      return _0x61afdb.data.data[0]?.profile_image_url;
    } catch (_0x2a7c02) {
      console.error("Error fetching Twitch user profile for user ID: " + _0x5ed343, _0x2a7c02);
      return null;
    }
  }
  async function _0x53070f(_0x4f5fe9, _0x1dc941) {
    try {
      const _0x47717d = {
        "Client-ID": config.Twitch.ClientID,
        Authorization: "Bearer " + _0x1dc941
      };
      const _0x284286 = {
        user_login: _0x4f5fe9
      };
      const _0x43d8ed = {
        headers: _0x47717d,
        params: _0x284286
      };
      const _0x4f1cc3 = await axios.get("https://api.twitch.tv/helix/streams", _0x43d8ed);
      return _0x4f1cc3.data.data[0];
    } catch (_0x54ab79) {
      console.error("Error fetching Twitch stream info for " + _0x4f5fe9 + ":", _0x54ab79.response ? _0x54ab79.response.data : _0x54ab79.message);
      return null;
    }
  }
  function _0x1f8e24(_0x35fbb3, _0x1f4331) {
    return "[" + _0x35fbb3 + "](" + _0x1f4331 + ")";
  }
  async function _0x29286c(_0x1e8e70, _0x38852c, _0x3756b1, _0x45d22) {
    const _0x48824d = config.Streamers[_0x38852c.name] || config.Streamers.Default;
    const _0x2a2b09 = "https://www.twitch.tv/" + _0x38852c.name;
    const _0x275d08 = _0x48824d.Embed.Description.map(_0x27b209 => _0x27b209.replace("{streamTitle}", _0x3756b1.title || "Live Stream").replace("{streamURL}", _0x2a2b09).replace("{markdownTitle}", _0x1f8e24(_0x3756b1.title || "Live Stream", _0x2a2b09)).replace("{viewerCount}", _0x3756b1.viewer_count.toString()).replace("{streamer}", _0x38852c.name)).filter(_0x3aefef => _0x3aefef).join("\n");
    const _0x4b4248 = _0x3756b1.thumbnail_url.replace("{width}", "320").replace("{height}", "180");
    const _0x5e3c30 = await _0x10f866(_0x3756b1.game_id, _0x45d22);
    const _0x548935 = await _0x4fc94e(_0x3756b1.user_id, _0x45d22);
    const _0x542b96 = _0x48824d.Embed.Title.replace("{streamer}", _0x38852c.name) || "Twitch Stream";
    const _0x534ebd = new EmbedBuilder().setColor(_0x48824d.Embed.Color || "#FF4500").setTitle(_0x542b96).setAuthor({
      name: _0x48824d.Embed.AuthorName.replace("{streamer}", _0x38852c.name),
      iconURL: _0x548935 || undefined,
      url: _0x2a2b09
    }).setDescription(_0x275d08).setThumbnail(_0x5e3c30).setImage(_0x4b4248).setFooter({
      text: _0x48824d.Embed.Footer || "Twitch Stream",
      iconURL: _0x48824d.Embed.FooterIcon || undefined
    });
    const _0x2efe67 = new ActionRowBuilder();
    _0x48824d.Embed.Components.forEach(_0x3948e6 => {
      if (_0x3948e6.Link) {
        const _0x314fd2 = new ButtonBuilder().setLabel(_0x3948e6.Label || "Join the fun!").setStyle(ButtonStyle.Link).setURL(_0x2a2b09).setEmoji(_0x3948e6.Emoji);
        _0x2efe67.addComponents(_0x314fd2);
      }
    });
    const _0xd1b93a = await _0x1e8e70.send({
      content: _0x48824d.Message.Content.replace("{streamer}", _0x38852c.name),
      embeds: [_0x534ebd],
      components: [_0x2efe67]
    });
    _0x38852c.announcementMessageId = _0xd1b93a.id;
    const _0x25cdb1 = setInterval(() => _0x4079d3(_0x38852c, _0x45d22, _0x1e8e70), 60000);
    _0x38852c.updateInterval = _0x25cdb1;
    _0x5c9889.add(_0x38852c.name);
  }
  async function _0x4079d3(_0x23baea, _0x384494, _0x157c64) {
    const _0xf22621 = await _0x53070f(_0x23baea.name, _0x384494);
    if (!_0xf22621) {
      _0x59ab2b(_0x23baea);
      return;
    }
    const _0x5aa4b1 = config.Streamers[_0x23baea.name] || config.Streamers.Default;
    const _0x44478d = "https://www.twitch.tv/" + _0x23baea.name;
    const _0x501db6 = _0xf22621.thumbnail_url.replace("{width}", "320").replace("{height}", "180") + "?t=" + Date.now();
    const _0x1ec3a9 = await _0x10f866(_0xf22621.game_id, _0x384494);
    const _0x5c9c39 = await _0x4fc94e(_0xf22621.user_id, _0x384494);
    const _0x40954c = _0x5aa4b1.Embed.Description.map(_0x4f91ba => _0x4f91ba.replace("{streamTitle}", _0xf22621.title || "Live Stream").replace("{streamURL}", _0x44478d).replace("{markdownTitle}", _0x1f8e24(_0xf22621.title || "Live Stream", _0x44478d)).replace("{viewerCount}", _0xf22621.viewer_count.toString()).replace("{streamer}", _0x23baea.name)).filter(_0x37084b => _0x37084b).join("\n");
    const _0x1f649f = _0x5aa4b1.Embed.Title.replace("{streamer}", _0x23baea.name) || "Twitch Stream";
    const _0x36d1ed = new EmbedBuilder().setColor(_0x5aa4b1.Embed.Color || "#FF4500").setTitle(_0x1f649f).setAuthor({
      name: _0x5aa4b1.Embed.AuthorName.replace("{streamer}", _0x23baea.name),
      iconURL: _0x5c9c39 || undefined,
      url: _0x44478d
    }).setDescription(_0x40954c).setThumbnail(_0x1ec3a9).setImage(_0x501db6).setFooter({
      text: _0x5aa4b1.Embed.Footer || "Twitch Stream",
      iconURL: _0x5aa4b1.Embed.FooterIcon || undefined
    });
    const _0x21a960 = await _0x157c64.messages.fetch(_0x23baea.announcementMessageId).catch(console.error);
    if (_0x21a960) {
      const _0x5865e9 = {
        embeds: [_0x36d1ed]
      };
      await _0x21a960.edit(_0x5865e9).catch(console.error);
    }
  }
  function _0x59ab2b(_0x208ae2) {
    if (_0x208ae2.updateInterval) {
      clearInterval(_0x208ae2.updateInterval);
      _0x208ae2.updateInterval = null;
    }
  }
  async function _0xa5f114() {
    if (!config.Warnings || !config.Warnings.Expiry) {
      console.error("Warning configuration is missing or incomplete.");
      return;
    }
    const _0x456dab = _0x3d0401(config.Warnings.Expiry);
    const _0x287e31 = new Date();
    const _0xfb8713 = new Date(_0x287e31.getTime() - _0x456dab);
    try {
      const _0x558562 = {
        $lte: _0xfb8713
      };
      const _0x4c1cb0 = {
        "warnings.date": _0x558562
      };
      const _0x5a93e1 = await UserData.find(_0x4c1cb0);
      for (const _0x5dcf9b of _0x5a93e1) {
        _0x5dcf9b.warnings = _0x5dcf9b.warnings.filter(_0x5a44e9 => _0x5a44e9.date > _0xfb8713);
        await _0x5dcf9b.save();
      }
    } catch (_0x51ba8e) {
      console.error("Error removing expired warnings:", _0x51ba8e);
    }
  }
  async function _0x41390d() {
    const _0x4e2bcf = path.join(__dirname, "commands", "General", "Leveling", "fonts", config.RankCard.Font);
    const _0x420d3f = path.join(__dirname, "commands", "General", "Leveling", "backgrounds", config.RankCard.Background);
    if (fs.existsSync(_0x4e2bcf)) {
      Font.fromFile(_0x4e2bcf, path.parse(_0x4e2bcf).name);
    } else {
      console.error(config.RankCard.Font + " font file not found. Please check the file path.");
    }
    if (fs.existsSync(_0x420d3f)) {} else {
      console.error(config.RankCard.Background + " background file not found. Please check the file path.");
    }
  }
  async function _0x394aef() {
    const _0x44dc97 = new Date();
    const _0x110d10 = {
      $lte: _0x44dc97
    };
    const _0x3a2e0f = {
      "tempBans.endTime": _0x110d10,
      "tempBans.lifted": false
    };
    UserData.find(_0x3a2e0f).then(async _0x16820a => {
      for (const _0x3ad73e of _0x16820a) {
        for (const _0x5a8bb7 of _0x3ad73e.tempBans) {
          if (_0x5a8bb7.endTime <= _0x44dc97 && !_0x5a8bb7.lifted) {
            const _0x38b1d0 = client.guilds.cache.get(_0x3ad73e.guildId);
            if (_0x38b1d0) {
              try {
                await _0x38b1d0.members.unban(_0x3ad73e.userId);
                _0x5a8bb7.lifted = true;
              } catch (_0xe6049d) {
                if (_0xe6049d.code === 10026) {
                  _0x3ad73e.tempBans = _0x3ad73e.tempBans.filter(_0x6e02bd => _0x6e02bd !== _0x5a8bb7);
                } else {
                  console.error("Failed to unban user " + _0x3ad73e.userId + ":", _0xe6049d);
                }
              }
            }
          }
        }
        await _0x3ad73e.save();
      }
    }).catch(_0x5c715d => {
      console.error("Error checking expired tempbans:", _0x5c715d);
    });
  }
  function _0x49157e() {
    setInterval(_0x394aef, 60000);
  }
  async function _0x5e5182(_0x56d9fb) {
    try {
      const _0x21f18a = await Ticket.find({
        status: {
          $in: ["open", "closed"]
        }
      });
      for (const _0x5daa76 of _0x21f18a) {
        const _0x20975c = (await _0x56d9fb.channels.cache.get(_0x5daa76.channelId)) || (await _0x56d9fb.channels.fetch(_0x5daa76.channelId).catch(() => null));
        if (!_0x20975c) {
          _0x5daa76.status = "deleted";
          _0x5daa76.deletedAt = new Date();
          await _0x5daa76.save();
        }
      }
    } catch (_0x1a89b1) {
      console.error("Error checking and updating ticket status:", _0x1a89b1);
    }
  }
  setInterval(async () => {
    const _0x5bbebc = new Date();
    const _0x6fcf3f = {
      $lte: _0x5bbebc
    };
    const _0x41bb67 = {
      reminderTime: _0x6fcf3f,
      sent: false
    };
    const _0x1d8329 = await Reminder.find(_0x41bb67);
    _0x1d8329.forEach(async _0x47356d => {
      try {
        const _0x4c955f = await client.channels.fetch(_0x47356d.channelId);
        const _0xfb2cee = await client.users.fetch(_0x47356d.userId);
        const _0x5a7d91 = new EmbedBuilder().setColor(_0x54e569(lang.Reminder.Embeds.DM.Color));
        if (lang.Reminder.Embeds.DM.Title) {
          _0x5a7d91.setTitle(lang.Reminder.Embeds.DM.Title);
        }
        if (lang.Reminder.Embeds.DM.Description) {
          _0x5a7d91.setDescription(lang.Reminder.Embeds.DM.Description.replace("{message}", _0x47356d.message));
        }
        if (lang.Reminder.Embeds.DM.Footer.Text) {
          const _0x1d9803 = {
            text: lang.Reminder.Embeds.DM.Footer.Text,
            iconURL: lang.Reminder.Embeds.DM.Footer.Icon
          };
          _0x5a7d91.setFooter(_0x1d9803);
        }
        if (lang.Reminder.Embeds.DM.Author.Text) {
          const _0x3d3984 = {
            name: lang.Reminder.Embeds.DM.Author.Text,
            iconURL: lang.Reminder.Embeds.DM.Author.Icon
          };
          _0x5a7d91.setAuthor(_0x3d3984);
        }
        if (lang.Reminder.Embeds.DM.Image) {
          _0x5a7d91.setImage(lang.Reminder.Embeds.DM.Image);
        }
        if (lang.Reminder.Embeds.DM.Thumbnail) {
          _0x5a7d91.setThumbnail(lang.Reminder.Embeds.DM.Thumbnail);
        }
        _0x5a7d91.setTimestamp();
        const _0x205c1d = {
          embeds: [_0x5a7d91]
        };
        await _0xfb2cee.send(_0x205c1d).catch(async _0x3927d2 => {
          if (_0x3927d2.code === 50007) {
            const _0x300605 = {
              content: "<@" + _0x47356d.userId + ">",
              embeds: [_0x5a7d91]
            };
            await _0x4c955f.send(_0x300605);
          } else {
            console.error("Failed to send reminder:", _0x3927d2);
          }
        });
        _0x47356d.sent = true;
        await _0x47356d.save();
      } catch (_0x140ab1) {
        console.error("Failed to send reminder:", _0x140ab1);
      }
    });
  }, 30000);
  async function _0x5d7f30() {
    const _0x580dbd = new Date();
    const _0x14c894 = {
      $lte: _0x580dbd
    };
    const _0x3544ff = {
      expiration: _0x14c894
    };
    const _0x48bc11 = await TempRole.find(_0x3544ff);
    for (const _0x4b369f of _0x48bc11) {
      const _0x376a3a = client.guilds.cache.get(_0x4b369f.guildId);
      if (!_0x376a3a) {
        continue;
      }
      try {
        const _0xa1c2bb = await _0x376a3a.members.fetch(_0x4b369f.userId);
        if (_0xa1c2bb) {
          await _0xa1c2bb.roles.remove(_0x4b369f.roleId);
        }
      } catch (_0x4f46a8) {
        console.error("Failed to remove expired role: " + _0x4f46a8);
      }
      const _0xd4c953 = {
        _id: _0x4b369f._id
      };
      await TempRole.deleteOne(_0xd4c953);
    }
  }
  client.polls = new Map();
  function _0x410ca1(_0x2884d6) {
    const _0x41365c = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
    return _0x41365c[_0x2884d6 - 1];
  }
  client.on("messageReactionAdd", async (_0x4967a3, _0x55b5ce) => {
    if (_0x55b5ce.bot) {
      return;
    }
    await _0x4ac048(_0x4967a3, _0x55b5ce, true);
  });
  client.on("messageReactionRemove", async (_0x271444, _0x577a9a) => {
    if (_0x577a9a.bot) {
      return;
    }
    await _0x4ac048(_0x271444, _0x577a9a, false);
  });
  async function _0x4ac048(_0x2ed82f, _0x4c20f6, _0x5711c6) {
    if (_0x2ed82f.partial) {
      try {
        await _0x2ed82f.fetch();
      } catch (_0x1975f3) {
        console.error("Failed to fetch reaction:", _0x1975f3);
        return;
      }
    }
    const _0x1d45b6 = client.polls.get(_0x2ed82f.message.id);
    if (!_0x1d45b6) {
      return;
    }
    if (_0x5711c6 && !_0x1d45b6.multiVote) {
      const _0x211c30 = _0x2ed82f.message.reactions.cache.filter(_0x3681b0 => _0x3681b0.users.cache.has(_0x4c20f6.id));
      for (const [, _0x118120] of _0x211c30) {
        if (_0x118120.emoji.name !== _0x2ed82f.emoji.name) {
          await _0x118120.users.remove(_0x4c20f6.id);
        }
      }
    }
    await _0x1a960d(_0x2ed82f.message, _0x1d45b6);
  }
  async function _0x1a960d(_0x599eb5, _0x768dd4) {
    const _0x2395be = _0x599eb5.reactions.cache;
    _0x768dd4.choices.forEach(_0x37b93c => {
      const _0x53a06a = _0x2395be.get(_0x37b93c.emoji)?.count || 0;
      _0x37b93c.votes = Math.max(_0x53a06a - 1, 0);
    });
    await _0x5922b4(_0x599eb5.id, _0x768dd4);
    await _0x5c3f65(_0x599eb5, _0x768dd4);
  }
  async function _0x5922b4(_0x362df4, _0x4370db) {
    try {
      const _0x100dd3 = {
        choices: _0x4370db.choices
      };
      const _0x3281ab = _0x100dd3;
      const _0x4cc2dd = {
        messageId: _0x362df4
      };
      await Poll.findOneAndUpdate(_0x4cc2dd, _0x3281ab);
    } catch (_0x703e52) {
      console.error("Failed to update poll in database:", _0x703e52);
    }
  }
  async function _0x5c3f65(_0x46d3cf, _0xbda3ae) {
    const _0x39ebb6 = _0x46d3cf.embeds[0];
    const _0x5ebbfb = new EmbedBuilder().setAuthor(_0x39ebb6.author).setTitle(_0x39ebb6.title).setColor(_0x39ebb6.color).setFooter(_0x39ebb6.footer).setTimestamp(_0x39ebb6.timestamp);
    let _0x4385c0 = "";
    _0xbda3ae.choices.forEach(_0x3b029c => {
      _0x4385c0 += _0x3b029c.emoji + " " + _0x3b029c.name + " (" + _0x3b029c.votes + " Votes)\n";
    });
    _0x5ebbfb.setDescription(_0x4385c0);
    try {
      const _0x1ac8cc = {
        embeds: [_0x5ebbfb]
      };
      await _0x46d3cf.edit(_0x1ac8cc);
    } catch (_0x46e0dd) {
      console.error("Failed to update poll message:", _0x46e0dd);
    }
  }
  async function _0xccd21e(_0x39f94a) {
    if (!_0x39f94a.polls) {
      _0x39f94a.polls = new Map();
    }
    try {
      const _0x4d7c49 = await Poll.find({});
      for (const _0x4c8270 of _0x4d7c49) {
        try {
          if (!_0x4c8270.messageId || !_0x4c8270.choices || !Array.isArray(_0x4c8270.choices)) {
            continue;
          }
          let _0x29b31c;
          try {
            _0x29b31c = await _0x39f94a.channels.fetch(_0x4c8270.channelId);
          } catch (_0x863dbf) {
            continue;
          }
          if (!_0x29b31c) {
            const _0x5dcd18 = {
              messageId: _0x4c8270.messageId
            };
            await Poll.deleteOne(_0x5dcd18);
            continue;
          }
          try {
            const _0x513492 = await _0x29b31c.messages.fetch(_0x4c8270.messageId);
            if (!_0x513492) {
              const _0x3c216a = {
                messageId: _0x4c8270.messageId
              };
              await Poll.deleteOne(_0x3c216a);
              continue;
            }
            _0x39f94a.polls.set(_0x4c8270.messageId, _0x4c8270);
          } catch (_0x301642) {
            if (_0x301642.message === "Unknown Message") {
              const _0xa0a705 = {
                messageId: _0x4c8270.messageId
              };
              await Poll.deleteOne(_0xa0a705);
            } else {
              console.log("Error fetching message for poll " + _0x4c8270.messageId + ": " + _0x301642.message + ". Skipping...");
            }
            continue;
          }
        } catch (_0xfb9d46) {
          console.error("Error processing poll " + _0x4c8270.messageId + ":", _0xfb9d46);
        }
      }
    } catch (_0x5efc28) {
      console.error("Failed to load polls from database:", _0x5efc28);
    }
  }
  function _0x19ac8a(_0xf74492) {
    const _0x274ff7 = /(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/;
    const _0x3f41dd = _0x274ff7.exec(_0xf74492);
    const _0x1ea5f1 = parseInt(_0x3f41dd[1]) || 0;
    const _0x210c6d = parseInt(_0x3f41dd[2]) || 0;
    const _0x3e3671 = parseInt(_0x3f41dd[3]) || 0;
    return (_0x1ea5f1 * 3600 + _0x210c6d * 60 + _0x3e3671) * 1000;
  }
  fs.readdir("./events/", async (_0x8e2b4d, _0x135f6b) => {
    if (_0x8e2b4d) {
      return console.error;
    }
    _0x135f6b.forEach(_0x5b300d => {
      if (!_0x5b300d.endsWith(".js")) {
        return;
      }
      const _0x438572 = require("./events/" + _0x5b300d);
      let _0x59b8e8 = _0x5b300d.split(".")[0];
      if (typeof _0x438572 !== "function") {
        console.error("[ERROR] Event file '" + _0x5b300d + "' does not export a function. Skipping...");
        return;
      }
      client.on(_0x59b8e8, _0x438572.bind(null, client));
    });
  });
  fs.readdir("./events/Music/", async (_0xa14ea2, _0x44810d) => {
    if (_0xa14ea2) {
      return console.error;
    }
    _0x44810d.forEach(_0x1efdff => {
      if (!_0x1efdff.endsWith(".js")) {
        return;
      }
      const _0x311cc8 = require("./events/Music/" + _0x1efdff);
      let _0x3be667 = _0x1efdff.split(".")[0];
      if (typeof _0x311cc8 !== "function") {
        console.error("[ERROR] Event file '" + _0x1efdff + "' does not export a function. Skipping...");
        return;
      }
      client.on(_0x3be667, _0x311cc8.bind(null, client));
    });
  });
  client.login(config.BotToken).catch(_0xf86280 => {
    if (_0xf86280.message.includes("Used disallowed intents")) {
      console.log("[31m%s[0m", "Used disallowed intents (READ HOW TO FIX): \n\nYou did not enable Privileged Gateway Intents in the Discord Developer Portal!\nTo fix this, you have to enable all the privileged gateway intents in your discord developer portal, you can do this by opening the discord developer portal, go to your application, click on bot on the left side, scroll down and enable Presence Intent, Server Members Intent, and Message Content Intent");
      process.exit();
    } else if (_0xf86280.message.includes("An invalid token was provided")) {
      console.log("[31m%s[0m", "[ERROR] The bot token specified in the config is incorrect!");
      process.exit();
    } else {
      console.log("[31m%s[0m", "[ERROR] An error occurred while attempting to login to the bot");
      console.log(_0xf86280);
      process.exit();
    }
  });
  function _0x284b31() {
    const _0x39acec = moment().tz(config.Timezone);
    const _0x3a9f46 = config.Economy.interestInterval.map(_0x429a66 => moment.tz(_0x429a66, "HH:mm", config.Timezone));
    _0x3a9f46.sort((_0x938fd1, _0x4cfefc) => _0x938fd1.diff(_0x4cfefc));
    for (const _0xb14c79 of _0x3a9f46) {
      if (_0x39acec.isBefore(_0xb14c79)) {
        return _0xb14c79;
      }
    }
    return _0x3a9f46[0].add(1, "day");
  }
  function _0x517699() {
    const _0x2d2af9 = process.env.TEST_MODE ? 60000 : 86400000;
    const _0x5e4218 = _0x284b31();
    setTimeout(async () => {
      const _0x2fcf28 = await UserData.find({});
      for (const _0x314cf6 of _0x2fcf28) {
        const _0x406c30 = _0x314cf6.interestRate !== null ? _0x314cf6.interestRate : config.Economy.defaultInterestRate;
        const _0x3ed972 = _0x314cf6.bank * _0x406c30;
        const _0x4ffd79 = {
          _id: _0x314cf6._id
        };
        const _0x37046f = {
          bank: _0x3ed972
        };
        await UserData.findOneAndUpdate(_0x4ffd79, {
          $inc: _0x37046f,
          $push: {
            transactionLogs: {
              type: "interest",
              amount: _0x3ed972,
              timestamp: new Date()
            }
          }
        });
      }
      _0x517699();
    }, _0x5e4218.diff(moment().tz(config.Timezone)));
  }
})();