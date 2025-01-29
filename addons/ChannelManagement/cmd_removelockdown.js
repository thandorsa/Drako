const { SlashCommandBuilder, PermissionsBitField, ChannelType, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const yaml = require('js-yaml');

const config = yaml.load(fs.readFileSync('./addons/ChannelManagement/config.yml', 'utf8'));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removelockdown')
        .setDescription('Removes the lockdown on all channels and deletes the lockdown channel')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels),
    async execute(interaction) {
        const member = interaction.member;
        const allowedRoles = config.command_permissions.removelockdown;

        if (!member.roles.cache.some(role => allowedRoles.includes(role.id))) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const guild = interaction.guild;

        if (!guild.members.me.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return interaction.reply({ content: 'I do not have permission to manage channels.', ephemeral: true });
        }

        await interaction.deferReply({ ephemeral: true });

        try {
            const avoidCategories = config.avoid_categories_lockdown;
            const channels = guild.channels.cache.filter(channel => 
                (channel.type === ChannelType.GuildText || 
                 channel.type === ChannelType.GuildVoice || 
                 channel.type === ChannelType.GuildForum) && 
                channel.viewable && 
                !avoidCategories.includes(channel.parentId)
            );

            for (const channel of channels.values()) {
                for (const roleId of config.LOCK_ROLES) {
                    await channel.permissionOverwrites.edit(roleId, { 
                        SendMessages: true,
                        ViewChannel: true,
                        Connect: true
                    });
                }
            }

            const lockdownChannel = guild.channels.cache.find(channel => channel.name === 'lockdown' && channel.type === ChannelType.GuildText);
            if (lockdownChannel) {
                await lockdownChannel.delete();
            }

            const replyContent = `🔓 The server lockdown has been removed. All channels have been unlocked and are visible again.`;
            await interaction.editReply({ content: replyContent });

            // Logging the action
            if (config.removelockdown.Enabled && config.removelockdown.LogsChannelID) {
                const logsChannel = await interaction.client.channels.fetch(config.removelockdown.LogsChannelID);
                if (logsChannel) {
                    const logEmbed = new EmbedBuilder()
                        .setTitle(config.removelockdown.Embed.Title)
                        .setDescription(
                            config.removelockdown.Embed.Description.map(line => line
                                .replace('{executor}', `<@${interaction.user.id}>`)
                                .replace('{longtime}', new Date().toLocaleString('en-US', { timeZone: 'UTC' }))
                                .replace('{shorttime}', new Date().toLocaleTimeString('en-US', { timeZone: 'UTC' }))
                            ).join('\n')
                        )
                        .setColor(config.removelockdown.Embed.Color)
                        .setFooter({ text: config.removelockdown.Embed.Footer, iconURL: config.FOOTER_ICON })
                        .setTimestamp();

                    if (config.removelockdown.Thumbnail) {
                        logEmbed.setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }));
                    }

                    await logsChannel.send({ embeds: [logEmbed] });
                }
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: 'There was an error trying to remove the server lockdown.' });
        }
    }
};
