const { EmbedBuilder } = require('discord.js');

module.exports.run = async (client) => {
    client.on('guildMemberUpdate', async (oldMember, newMember) => {
        const boostChannelId = "1264328522198159506";
        try {
            const boostChannel = await client.channels.fetch(boostChannelId);
            if (!boostChannel) return;

            if (oldMember.premiumSinceTimestamp !== newMember.premiumSinceTimestamp) {
                const user = newMember.user;
                const usernick = newMember.nickname || user.username;
                const userMention = `<@${user.id}>`;
                const embed = new EmbedBuilder()
                    .setAuthor({ name: usernick, iconURL: user.displayAvatarURL() })
                    .setTimestamp();

                if (newMember.premiumSince) {
                    embed.setColor('#ff73fa')
                         .setTitle('New Server Boost!')
                         .setDescription(`${userMention} just boosted the server! Thank you! 🚀`)
                         .setFooter({ text: `We now have ${newMember.guild.premiumSubscriptionCount} boosts!` });
                } else {
                    embed.setColor('#ff0000')
                         .setTitle('Server Boost Lost')
                         .setDescription(`${userMention} has unboosted the server. 😢`);
                }

                await boostChannel.send({ embeds: [embed] });
            }
        } catch (error) {
            console.error(`Failed to send boost notification: ${error}`);
        }
    });
};