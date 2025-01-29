const Discord = require("discord.js");
const fs = require('fs');
const yaml = require("js-yaml")
const config = yaml.load(fs.readFileSync('./config.yml', 'utf8'))

const rConfig = {
    enabled: true,
    status: "DISCORD INVITE", // The status to check for
    roleID: "ROLE ID", // The role to give a user if they have the specified custom status
}

module.exports.run = async (client) => {
    if(rConfig.enabled === false) return
    console.log("[ADDON] StatusRole loaded!")
    client.on('presenceUpdate', async (oldMember, newMember) => {
        let guild = client.guilds.cache.get(config.GuildID)
        if (!oldMember || !newMember) return;
        if(oldMember.status !== newMember.status) return
        const roleId = rConfig.roleID;
        const message = rConfig.status;
        const role = guild.roles.cache.get(roleId)
        if (!role) return;
        let status = newMember.activities.map(a => a.state)
        const member = guild.members.cache.get(newMember.user.id);
        if (!member) return;
        if (status[0] && status[0].includes(message)) {
            if (!member.roles.cache.some((r) => r.id === roleId)) {
                let icon = guild.iconURL()
                const embed = new Discord.EmbedBuilder()
                if(icon) embed.setTitle(guild.name, icon)
                if(!icon) embed.setTitle(guild.name)
                embed.setColor(config.EmbedColors)
                embed.setDescription(`<@${newMember.user.id}> has added ${rConfig.status} to their custom status! Thank you. You have now recieved the <@&${rConfig.roleID}> role!`)
                if(icon) embed.setThumbnail(icon)
                embed.setFooter({ text: `${guild.name} ${newMember.user.id}`, iconURL: `${newMember.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })}` })
                embed.setTimestamp()
                
                client.channels.cache.get('CHANNEL ID').send({ embeds: [embed] })
            }
            member.roles.add(roleId)
        } else {
            if (member.roles.cache.some((r) => r.id === roleId)) {
                let icon = guild.iconURL()
                const embed = new Discord.EmbedBuilder()
                if(icon) embed.setTitle(guild.name, icon)
                if(!icon) embed.setTitle(guild.name)
                embed.setColor(config.EmbedColors)
                embed.setDescription(`<@${newMember.user.id}> has removed ${rConfig.status} from their custom status! You have now lost the <@&${rConfig.roleID}> role!`)
                if(icon) embed.setThumbnail(icon)
                embed.setFooter({ text: `${guild.name} ${newMember.user.id}`, iconURL: `${newMember.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })}` })
                embed.setTimestamp()
    
                client.channels.cache.get('CHANNEL ID').send({ embeds: [embed] })
                member.roles.remove(roleId)
            }
          }
    });
};