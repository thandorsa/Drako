if (process.platform !== "win32") {
  require("child_process").exec("npm install");
}
const colors = require("ansi-colors");
console.log("" + colors.yellow("[Initializing...]"));
const fs = require("fs");
const packageFile = require("./package.json");
const yaml = require("js-yaml");
const config = yaml.load(fs.readFileSync("./config.yml", "utf8"));
const lang = yaml.load(fs.readFileSync("././lang.yml", "utf8"));
if (packageFile.version !== config.Version) {
  console.log("" + colors.red("[ERROR] Version mismatch: package.json version (" + packageFile.version + ") does not match config.yml version (" + config.Version + "). Please update the bot..."));
  let logMsg = "\n\n[" + new Date().toLocaleString() + "] [ERROR] Version mismatch detected. Bot stopped.\nPackage version: " + packageFile.version + "\nConfig version: " + config.Version;
  fs.appendFileSync("./logs.txt", logMsg, _0xa4ab7e => {
    if (_0xa4ab7e) {
      console.log(_0xa4ab7e);
    }
  });
  process.exit(1);
}
let logMsg = "\n\n[" + new Date().toLocaleString() + "] [STARTING] Attempting to start the bot..\nNodeJS Version: " + process.version + "\nBot Version: " + packageFile.version;
fs.appendFile("./logs.txt", logMsg, _0x372bc3 => {
  if (_0x372bc3) {
    console.log(_0x372bc3);
  }
});
const version = Number(process.version.split(".")[0].replace("v", ""));
if (version < 18) {
  console.log("" + colors.red("[ERROR] Drako Bot requires a NodeJS version of 18 or higher!\nYou can check your NodeJS by running the \"node -v\" command in your terminal."));
  console.log("" + colors.blue("\n[INFO] To update Node.js, follow the instructions below for your operating system:"));
  console.log(colors.green("- Windows:") + " Download and run the installer from " + colors.cyan("https://nodejs.org/"));
  console.log(colors.green("- Ubuntu/Debian:") + " Run the following commands in the Terminal:");
  console.log("" + colors.cyan("  - sudo apt update"));
  console.log("" + colors.cyan("  - sudo apt upgrade nodejs"));
  console.log(colors.green("- CentOS:") + " Run the following commands in the Terminal:");
  console.log("" + colors.cyan("  - sudo yum update"));
  console.log("" + colors.cyan("  - sudo yum install -y nodejs"));
  let logMsg = "\n\n[" + new Date().toLocaleString() + "] [ERROR] Drako Bot requires a NodeJS version of 18 or higher!";
  fs.appendFile("./logs.txt", logMsg, _0x860196 => {
    if (_0x860196) {
      console.log(_0x860196);
    }
  });
  process.exit();
}
const {
  Collection,
  Client,
  GatewayIntentBits,
  Partials,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");
const Discord = require("discord.js");
const backup = require("discord-backup");
const axios = require("axios");
const Invite = require("./models/inviteSchema");
const UserData = require("./models/UserData");
const _0x486c02 = {
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent]
};
const client = new Client(_0x486c02);
client.invites = new Map();
client.once("ready", async () => {
  client.guilds.cache.forEach(async _0x2bb8fa => {
    try {
      const _0x8c1f4 = await _0x2bb8fa.invites.fetch();
      const _0x2fab2a = new Map(_0x8c1f4.map(_0x4347f1 => [_0x4347f1.code, _0x4347f1.uses]));
      client.invites.set(_0x2bb8fa.id, _0x2fab2a);
    } catch (_0x17188a) {
      console.error("Failed to fetch invites or determine existing members for guild " + _0x2bb8fa.id + ": " + _0x17188a);
    }
  });
});
client.on("inviteCreate", async _0x256dd9 => {
  const _0x252cc2 = await _0x256dd9.guild.invites.fetch();
  const _0x13fb59 = new Map(_0x252cc2.map(_0x34b1d5 => [_0x34b1d5.code, _0x34b1d5.uses]));
  client.invites.set(_0x256dd9.guild.id, _0x13fb59);
});
client.on("inviteDelete", _0x1e7bde => {
  const _0x54f830 = client.invites.get(_0x1e7bde.guild.id);
  _0x54f830.delete(_0x1e7bde.code);
  client.invites.set(_0x1e7bde.guild.id, _0x54f830);
});
process.on("uncaughtException", _0x259ec1 => {
  console.error("Uncaught Exception:", _0x259ec1);
  fs.appendFile("logs.txt", "Uncaught Exception: " + (_0x259ec1.stack || _0x259ec1) + "\n", _0x51d2a6 => {
    if (_0x51d2a6) {
      console.error("Failed to write to log file:", _0x51d2a6);
    }
  });
});
process.on("unhandledRejection", (_0x564dfc, _0x1b719a) => {
  console.error("Unhandled Rejection at:", _0x1b719a, "reason:", _0x564dfc);
  fs.appendFile("logs.txt", "Unhandled Rejection at: " + _0x1b719a + ", reason: " + (_0x564dfc.stack || _0x564dfc) + "\n", _0x3f3949 => {
    if (_0x3f3949) {
      console.error("Failed to write to log file:", _0x3f3949);
    }
  });
});
module.exports = client;
require("./utils.js");
require("./events/antiNuke")(client);
const filePath = "./logs.txt";
const maxLength = 300;
const {
  Player
} = require("discord-player");
const {
  YoutubeiExtractor
} = require("discord-player-youtubei");
const player = new Player(client);
const youtubeAuth = config.YouTubeKey;
async function registerExtractors() {
  const _0x18c529 = {
    useClient: config.Player
  };
  const _0x386301 = {
    streamOptions: _0x18c529,
    authentication: youtubeAuth
  };
  await player.extractors.register(YoutubeiExtractor, _0x386301);
  await player.extractors.loadDefault(_0x37d72a => !["YouTubeExtractor"].includes(_0x37d72a));
}
registerExtractors();
function replacePlaceholders(_0x58a4e9, _0x3276a4 = {}) {
  if (!_0x58a4e9) {
    return "​";
  }
  return Object.keys(_0x3276a4).reduce((_0x326c6c, _0x16211a) => {
    const _0x1b6edb = new RegExp("{" + _0x16211a + "}", "gi");
    return _0x326c6c.replace(_0x1b6edb, _0x3276a4[_0x16211a] || "");
  }, _0x58a4e9);
}
player.events.on("playerStart", (_0x17d527, _0x56567c) => {
  try {
    const _0x3c360c = getPlatformName(_0x56567c.extractor);
    const _0x412f5c = getPlatformEmoji(_0x3c360c);
    const _0x529806 = {
      id: _0x56567c.id,
      title: _0x56567c?.title || "Track",
      description: _0x56567c?.description || "None",
      author: _0x3c360c === "Spotify" || _0x3c360c === "Apple Music" ? "" + _0x56567c?.author : "",
      url: _0x56567c?.url || "None",
      thumbnail: _0x56567c?.thumbnail || "None",
      duration: _0x56567c?.duration || "00:00",
      durationMS: _0x56567c?.durationMS || "0000",
      views: _0x56567c?.views || "0",
      requestedByMention: _0x56567c?.requestedBy || "Nobody",
      requestedByDisplayName: _0x56567c?.requestedBy.globalName || "Nobody",
      playlistName: _0x56567c?.playlist?.title || "None",
      playlistUrl: _0x56567c?.playlist?.url || "None",
      playlistThumbnail: _0x56567c?.playlist?.thumbnail || "None",
      platform: _0x3c360c || "Discord",
      platformEmoji: _0x412f5c || "https://imgur.com/csAsSqY",
      queueCount: _0x17d527?.tracks.data.length || "0",
      queueDuration: _0x17d527?.durationFormatted || "00:00"
    };
    const _0x533251 = _0x529806;
    const _0x18b1ef = config.MusicCommand.CurrentTrack;
    if (_0x18b1ef.Enabled) {
      if (_0x18b1ef && _0x18b1ef.Type.toUpperCase() === "EMBED") {
        const _0x1f9d8f = new EmbedBuilder();
        if (_0x18b1ef.Embed.Color) {
          _0x1f9d8f.setColor(_0x18b1ef.Embed.Color);
        }
        if (_0x18b1ef.Embed.Title) {
          _0x1f9d8f.setTitle(replacePlaceholders(_0x18b1ef.Embed.Title, _0x533251));
        }
        if (_0x18b1ef.Embed.Description) {
          _0x1f9d8f.setDescription(replacePlaceholders(_0x18b1ef.Embed.Description.replace(_0x3c360c !== "Spotify" && _0x3c360c !== "Apple Music" ? "-" : "", ""), _0x533251));
        }
        if (_0x18b1ef.Embed.Fields) {
          _0x18b1ef.Embed.Fields.forEach(_0x2c68a7 => {
            const _0x1b9c11 = replacePlaceholders(_0x2c68a7.Name, _0x533251);
            const _0x2018ed = replacePlaceholders(_0x2c68a7.Value, _0x533251);
            const _0x10a35a = {
              name: _0x1b9c11,
              value: _0x2018ed,
              inline: _0x2c68a7.Inline ?? false
            };
            _0x1f9d8f.addFields(_0x10a35a);
          });
        }
        if (_0x18b1ef.Embed.Thumbnail && isValidHttpUrl(replacePlaceholders(_0x18b1ef.Embed.Thumbnail, _0x533251))) {
          _0x1f9d8f.setThumbnail(replacePlaceholders(_0x18b1ef.Embed.Thumbnail, _0x533251));
        }
        if (_0x18b1ef.Embed.Image && isValidHttpUrl(replacePlaceholders(_0x18b1ef.Embed.Image, _0x533251))) {
          _0x1f9d8f.setImage(replacePlaceholders(_0x18b1ef.Embed.Image, _0x533251));
        }
        if (_0x18b1ef.Embed.Author && _0x18b1ef.Embed.Author.Text) {
          const _0x5b9f43 = replacePlaceholders(_0x18b1ef.Embed.Author.Icon, _0x533251);
          _0x1f9d8f.setAuthor({
            name: replacePlaceholders(_0x18b1ef.Embed.Author.Text, _0x533251),
            iconURL: isValidHttpUrl(_0x5b9f43) ? _0x5b9f43 : undefined,
            url: _0x533251.url
          });
        }
        if (_0x18b1ef.Embed.Footer && _0x18b1ef.Embed.Footer.Text) {
          const _0xcd5ef3 = _0x18b1ef.Embed.Footer.Icon;
          _0x1f9d8f.setFooter({
            text: replacePlaceholders(_0x18b1ef.Embed.Footer.Text, _0x533251),
            iconURL: isValidHttpUrl(_0xcd5ef3) ? _0xcd5ef3 : undefined
          });
        }
        const _0x358efd = new ActionRowBuilder();
        _0x358efd.addComponents(new ButtonBuilder().setCustomId("music_back").setEmoji(config.MusicCommand.Emojis.Back).setStyle(ButtonStyle.Secondary));
        _0x358efd.addComponents(new ButtonBuilder().setCustomId("music_play_pause").setEmoji(config.MusicCommand.Emojis.Pause).setStyle(ButtonStyle.Secondary));
        _0x358efd.addComponents(new ButtonBuilder().setCustomId("music_next").setEmoji(config.MusicCommand.Emojis.Next).setStyle(ButtonStyle.Secondary));
        _0x358efd.addComponents(new ButtonBuilder().setCustomId("music_loop").setEmoji(config.MusicCommand.Emojis.Repeat).setStyle(ButtonStyle.Secondary));
        const _0x1d05fc = {
          embeds: [_0x1f9d8f],
          components: [_0x358efd]
        };
        _0x17d527.metadata.channel.send(_0x1d05fc);
      } else if (_0x18b1ef.Message) {
        const _0x5167a1 = replacePlaceholders(_0x18b1ef.Message, _0x533251);
        _0x17d527.metadata.channel.send(_0x5167a1);
      }
    }
  } catch (_0x1aed19) {
    console.error("Error in playerStart event handler:", _0x1aed19);
  }
});
player.events.on("audioTrackAdd", (_0x5cbdb2, _0x40ca21) => {
  try {
    if (_0x40ca21.playlist) {
      return;
    }
    const _0x485b79 = getPlatformName(_0x40ca21.extractor);
    const _0xf9d17c = getPlatformEmoji(_0x485b79);
    const _0x3ac779 = {
      id: _0x40ca21.id,
      title: _0x40ca21?.title || "Track",
      description: _0x40ca21?.description || "None",
      author: _0x485b79 === "Spotify" || _0x485b79 === "Apple Music" ? "" + _0x40ca21?.author : "",
      url: _0x40ca21?.url || "None",
      thumbnail: _0x40ca21?.thumbnail || "None",
      duration: _0x40ca21?.duration || "00:00",
      durationMS: _0x40ca21?.durationMS || "0000",
      views: _0x40ca21?.views || "0",
      requestedByMention: _0x40ca21?.requestedBy || "Nobody",
      requestedByDisplayName: _0x40ca21?.requestedBy.globalName || "Nobody",
      platform: _0x485b79 || "Discord",
      platformEmoji: _0xf9d17c || "https://imgur.com/csAsSqY",
      queueCount: _0x5cbdb2.tracks.data.length.toString(),
      queueDuration: _0x5cbdb2?.durationFormatted || "00:00"
    };
    const _0x4f1d3b = config.MusicCommand.AddedTrack;
    if (_0x4f1d3b.Enabled) {
      if (_0x4f1d3b && _0x4f1d3b.Type.toUpperCase() === "EMBED") {
        const _0x256d08 = new EmbedBuilder();
        if (_0x4f1d3b.Embed.Color) {
          _0x256d08.setColor(_0x4f1d3b.Embed.Color);
        }
        if (_0x4f1d3b.Embed.Title) {
          _0x256d08.setTitle(replacePlaceholders(_0x4f1d3b.Embed.Title, _0x3ac779));
        }
        if (_0x4f1d3b.Embed.Description) {
          _0x256d08.setDescription(replacePlaceholders(_0x4f1d3b.Embed.Description.replace(_0x485b79 !== "Spotify" && _0x485b79 !== "Apple Music" ? "-" : "", ""), _0x3ac779));
        }
        if (_0x4f1d3b.Embed.Fields) {
          _0x4f1d3b.Embed.Fields.forEach(_0xd63d0d => {
            const _0x44f518 = replacePlaceholders(_0xd63d0d.Name, _0x3ac779);
            const _0x3184c2 = replacePlaceholders(_0xd63d0d.Value, _0x3ac779);
            const _0x1043a3 = {
              name: _0x44f518,
              value: _0x3184c2,
              inline: _0xd63d0d.Inline ?? false
            };
            _0x256d08.addFields(_0x1043a3);
          });
        }
        if (_0x4f1d3b.Embed.Thumbnail && isValidHttpUrl(replacePlaceholders(_0x4f1d3b.Embed.Thumbnail, _0x3ac779))) {
          _0x256d08.setThumbnail(replacePlaceholders(_0x4f1d3b.Embed.Thumbnail, _0x3ac779));
        }
        if (_0x4f1d3b.Embed.Image && isValidHttpUrl(replacePlaceholders(_0x4f1d3b.Embed.Image, _0x3ac779))) {
          _0x256d08.setImage(replacePlaceholders(_0x4f1d3b.Embed.Image, _0x3ac779));
        }
        if (_0x4f1d3b.Embed.Author && _0x4f1d3b.Embed.Author.Text) {
          const _0x548faf = replacePlaceholders(_0x4f1d3b.Embed.Author.Icon, _0x3ac779);
          _0x256d08.setAuthor({
            name: replacePlaceholders(_0x4f1d3b.Embed.Author.Text, _0x3ac779),
            iconURL: isValidHttpUrl(_0x548faf) ? _0x548faf : undefined,
            url: _0x3ac779.url
          });
        }
        if (_0x4f1d3b.Embed.Footer && _0x4f1d3b.Embed.Footer.Text) {
          const _0x41973f = _0x4f1d3b.Embed.Footer.Icon;
          _0x256d08.setFooter({
            text: replacePlaceholders(_0x4f1d3b.Embed.Footer.Text, _0x3ac779),
            iconURL: isValidHttpUrl(_0x41973f) ? _0x41973f : undefined
          });
        }
        const _0x563b91 = {
          embeds: [_0x256d08]
        };
        _0x5cbdb2.metadata.channel.send(_0x563b91);
      } else if (_0x4f1d3b.Message) {
        const _0x1becee = replacePlaceholders(_0x4f1d3b.Message, _0x3ac779);
        _0x5cbdb2.metadata.channel.send(_0x1becee);
      }
    }
  } catch (_0x23dbc1) {
    console.error("Error in audioTrackAdd event handler:", _0x23dbc1);
  }
});
player.events.on("audioTracksAdd", async (_0x26641e, _0x457efe) => {
  try {
    if (_0x26641e.metadata.hasSentPlaylistMessage) {
      return;
    }
    const _0x38ff51 = _0x457efe.filter((_0x34ee94, _0x397d1d, _0x40e138) => _0x397d1d === _0x40e138.findIndex(_0x3ca936 => _0x3ca936.url === _0x34ee94.url));
    const _0xf91e34 = _0x38ff51[0];
    const _0x146535 = getPlatformName(_0xf91e34.extractor);
    const _0x17db42 = getPlatformEmoji(_0x146535);
    const _0x44c927 = {
      id: _0xf91e34.id,
      url: _0xf91e34?.url || "None",
      requestedByMention: _0xf91e34?.requestedBy || "Nobody",
      requestedByDisplayName: _0xf91e34?.requestedBy.globalName || "Nobody",
      playlistName: _0x457efe?.playlist?.title || "None",
      playlistUrl: _0x457efe?.playlist?.url || "None",
      playlistThumbnail: _0x457efe?.playlist?.thumbnail || "None",
      trackCount: _0x38ff51.length,
      queueCount: _0x26641e?.tracks.data.length.toString() || "0",
      queueDuration: _0x26641e?.durationFormatted || "00:00",
      platform: _0x146535 || "Discord",
      platformEmoji: _0x17db42 || "https://imgur.com/csAsSqY"
    };
    const _0x555a3f = config.MusicCommand.AddedTracks;
    if (_0x555a3f.Enabled) {
      if (_0x555a3f.Type.toUpperCase() === "EMBED") {
        const _0x12a323 = new EmbedBuilder();
        if (_0x555a3f.Embed.Color) {
          _0x12a323.setColor(_0x555a3f.Embed.Color);
        }
        if (_0x555a3f.Embed.Title) {
          _0x12a323.setTitle(replacePlaceholders(_0x555a3f.Embed.Title, _0x44c927));
        }
        if (_0x555a3f.Embed.Description) {
          _0x12a323.setDescription(replacePlaceholders(_0x555a3f.Embed.Description, _0x44c927));
        }
        if (_0x555a3f.Embed.Fields) {
          _0x555a3f.Embed.Fields.forEach(_0x15888b => {
            const _0x5ae5b1 = replacePlaceholders(_0x15888b.Name, _0x44c927);
            const _0x142871 = replacePlaceholders(_0x15888b.Value, _0x44c927);
            const _0x3c31ab = {
              name: _0x5ae5b1,
              value: _0x142871,
              inline: _0x15888b.Inline ?? false
            };
            _0x12a323.addFields(_0x3c31ab);
          });
        }
        if (_0x555a3f.Embed.Thumbnail && isValidHttpUrl(replacePlaceholders(_0x555a3f.Embed.Thumbnail, _0x44c927))) {
          _0x12a323.setThumbnail(replacePlaceholders(_0x555a3f.Embed.Thumbnail, _0x44c927));
        }
        if (_0x555a3f.Embed.Image && isValidHttpUrl(replacePlaceholders(_0x555a3f.Embed.Image, _0x44c927))) {
          _0x12a323.setImage(replacePlaceholders(_0x555a3f.Embed.Image, _0x44c927));
        }
        if (_0x555a3f.Embed.Author && _0x555a3f.Embed.Author.Text) {
          const _0x103d25 = replacePlaceholders(_0x555a3f.Embed.Author.Icon, _0x44c927);
          _0x12a323.setAuthor({
            name: replacePlaceholders(_0x555a3f.Embed.Author.Text, _0x44c927),
            iconURL: isValidHttpUrl(_0x103d25) ? _0x103d25 : undefined,
            url: _0x44c927.url
          });
        }
        const _0x4f4ed8 = {
          embeds: [_0x12a323]
        };
        await _0x26641e.metadata.channel.send(_0x4f4ed8);
        _0x26641e.metadata.hasSentPlaylistMessage = true;
      } else if (_0x555a3f.Message) {
        const _0x49bc4a = replacePlaceholders(_0x555a3f.Message, _0x44c927);
        await _0x26641e.metadata.channel.send(_0x49bc4a);
        _0x26641e.metadata.hasSentPlaylistMessage = true;
      }
    }
  } catch (_0x25137a) {
    console.error("Error in audioTracksAdd event handler:", _0x25137a);
    if (_0x25137a.message && _0x25137a.message.includes("ERR_NO_RESULT")) {
      await _0x26641e.metadata.channel.send({
        content: "Sorry, I could not extract the stream for this track. Please try another track.",
        ephemeral: true
      });
    } else {
      await _0x26641e.metadata.channel.send({
        content: "An unexpected error occurred while adding tracks.",
        ephemeral: true
      });
    }
  }
});
player.events.on("playerFinish", (_0x281d48, _0x3bd0cd) => {
  try {
    const _0x14c1f8 = getPlatformName(_0x3bd0cd.extractor);
    const _0x170dcd = getPlatformEmoji(_0x14c1f8);
    const _0x2806e8 = {
      id: _0x3bd0cd.id,
      title: _0x3bd0cd?.title || "Track",
      description: _0x3bd0cd?.description || "None",
      author: _0x14c1f8 === "Spotify" || _0x14c1f8 === "Apple Music" ? "" + _0x3bd0cd?.author : "",
      url: _0x3bd0cd?.url || "None",
      thumbnail: _0x3bd0cd?.thumbnail || "None",
      duration: _0x3bd0cd?.duration || "00:00",
      durationMS: _0x3bd0cd?.durationMS || "0000",
      views: _0x3bd0cd?.views || "0",
      requestedByMention: _0x3bd0cd?.requestedBy || "Nobody",
      requestedByDisplayName: _0x3bd0cd?.requestedBy.globalName || "Nobody",
      playlistName: _0x3bd0cd?.playlist?.title || "None",
      playlistUrl: _0x3bd0cd?.playlist?.url || "None",
      playlistThumbnail: _0x3bd0cd?.playlist?.thumbnail || "None",
      platform: _0x14c1f8 || "Discord",
      platformEmoji: _0x170dcd || "https://imgur.com/csAsSqY",
      queueCount: _0x281d48?.tracks.data.length || "0",
      queueDuration: _0x281d48?.durationFormatted || "00:00"
    };
    const _0x20a970 = _0x2806e8;
    const _0x5d0b68 = config.MusicCommand.TrackFinished;
    if (_0x5d0b68.Enabled) {
      if (_0x5d0b68 && _0x5d0b68.Type.toUpperCase() === "EMBED") {
        const _0x22c2de = new EmbedBuilder();
        if (_0x5d0b68.Embed.Color) {
          _0x22c2de.setColor(_0x5d0b68.Embed.Color);
        }
        if (_0x5d0b68.Embed.Title) {
          _0x22c2de.setTitle(replacePlaceholders(_0x5d0b68.Embed.Title, _0x20a970));
        }
        if (_0x5d0b68.Embed.Description) {
          _0x22c2de.setDescription(replacePlaceholders(_0x5d0b68.Embed.Description.replace(_0x14c1f8 !== "Spotify" && _0x14c1f8 !== "Apple Music" ? "-" : "", ""), _0x20a970));
        }
        if (_0x5d0b68.Embed.Fields) {
          _0x5d0b68.Embed.Fields.forEach(_0x52a587 => {
            const _0x31a5f1 = replacePlaceholders(_0x52a587.Name, _0x20a970);
            const _0x20c30a = replacePlaceholders(_0x52a587.Value, _0x20a970);
            const _0x31d9e4 = {
              name: _0x31a5f1,
              value: _0x20c30a,
              inline: _0x52a587.Inline ?? false
            };
            _0x22c2de.addFields(_0x31d9e4);
          });
        }
        if (_0x5d0b68.Embed.Thumbnail && isValidHttpUrl(replacePlaceholders(_0x5d0b68.Embed.Thumbnail, _0x20a970))) {
          _0x22c2de.setThumbnail(replacePlaceholders(_0x5d0b68.Embed.Thumbnail, _0x20a970));
        }
        if (_0x5d0b68.Embed.Image && isValidHttpUrl(replacePlaceholders(_0x5d0b68.Embed.Image, _0x20a970))) {
          _0x22c2de.setImage(replacePlaceholders(_0x5d0b68.Embed.Image, _0x20a970));
        }
        if (_0x5d0b68.Embed.Author && _0x5d0b68.Embed.Author.Text) {
          const _0x310dbf = replacePlaceholders(_0x5d0b68.Embed.Author.Icon, _0x20a970);
          _0x22c2de.setAuthor({
            name: replacePlaceholders(_0x5d0b68.Embed.Author.Text, _0x20a970),
            iconURL: isValidHttpUrl(_0x310dbf) ? _0x310dbf : undefined,
            url: _0x20a970.url
          });
        }
        if (_0x5d0b68.Embed.Footer && _0x5d0b68.Embed.Footer.Text) {
          const _0x5dd1a5 = _0x5d0b68.Embed.Footer.Icon;
          _0x22c2de.setFooter({
            text: replacePlaceholders(_0x5d0b68.Embed.Footer.Text, _0x20a970),
            iconURL: isValidHttpUrl(_0x5dd1a5) ? _0x5dd1a5 : undefined
          });
        }
        const _0x58b95d = {
          embeds: [_0x22c2de]
        };
        _0x281d48.metadata.channel.send(_0x58b95d);
      } else if (_0x5d0b68.Message) {
        const _0x58c8ca = replacePlaceholders(_0x5d0b68.Message, _0x20a970);
        _0x281d48.metadata.channel.send(_0x58c8ca);
      }
    }
  } catch (_0x2497fb) {
    console.error("Error in playerFinish event handler:", _0x2497fb);
  }
});
function getPlatformName(_0x35e574) {
  let _0xcb3882 = "Unknown Platform";
  for (const _0x3507b6 of _0x35e574.protocols) {
    switch (_0x3507b6) {
      case "ytsearch":
      case "youtube":
        _0xcb3882 = "YouTube";
        break;
      case "spsearch":
      case "spotify":
        _0xcb3882 = "Spotify";
        break;
      case "scsearch":
      case "soundcloud":
        _0xcb3882 = "SoundCloud";
        break;
      case "amsearch":
      case "applemusic":
        _0xcb3882 = "Apple Music";
        break;
      default:
        continue;
    }
    if (_0xcb3882 !== "Unknown Platform") {
      break;
    }
  }
  return _0xcb3882;
}
function getPlatformEmoji(_0x3b3547) {
  let _0x50a5a3 = "";
  switch (_0x3b3547) {
    case "YouTube":
      _0x50a5a3 = config.MusicCommand.Emojis.Platform.YouTube;
      break;
    case "Spotify":
      _0x50a5a3 = config.MusicCommand.Emojis.Platform.Spotify;
      break;
    case "SoundCloud":
      _0x50a5a3 = config.MusicCommand.Emojis.Platform.SoundCloud;
      break;
    case "Apple Music":
      _0x50a5a3 = config.MusicCommand.Emojis.Platform.AppleMusic;
      break;
    default:
      _0x50a5a3 = "https://imgur.com/csAsSqY";
      break;
  }
  return _0x50a5a3;
}
function isValidHttpUrl(_0x3494a4) {
  let _0x2ec5e1;
  try {
    _0x2ec5e1 = new URL(_0x3494a4);
  } catch (_0x3c1cff) {
    return false;
  }
  return _0x2ec5e1.protocol === "http:" || _0x2ec5e1.protocol === "https:";
}
if (config.Dashboard && config.Dashboard.Enabled) {
  const port = config.Dashboard.Port || 3000;
  const app = require("./server");
  const PORT = port || process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(colors.green("[✓] Server running on port " + PORT));
  });
} else {}
const {
  xYs123
} = require("./utils.js");
const {
  url
} = require("inspector");
const {
  duration
} = require("moment");
const {
  title
} = require("process");
async function startBot() {
}
const _0x3c2255 = {
  startBot: startBot
};
module.exports = _0x3c2255;