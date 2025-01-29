const { SlashCommandBuilder, PermissionsBitField, ChannelType, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const yaml = require('js-yaml');

const config = yaml.load(fs.readFileSync('./addons/ChannelManagement/config.yml', 'utf8'));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlockall')
        .setDescription('Unlocks all text channels in the server')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels),
    async execute(interaction) {
        const member = interaction.member;
        const allowedRoles = config.command_permissions.unlockall;

        if (!member.roles.cache.some(role => allowedRoles.includes(role.id))) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const guild = interaction.guild;

        if (!guild.members.me.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return interaction.reply({ content: 'I do not have permission to manage channels.', ephemeral: true });
        }

        await interaction.deferReply({ ephemeral: true });

        try {
            const avoidCategories = config.avoid_categories_lock;
            const channels = guild.channels.cache.filter(channel => 
                (channel.type === ChannelType.GuildText || 
                 channel.type === ChannelType.GuildForum) && 
                channel.viewable && 
                !avoidCategories.includes(channel.parentId)
            );

            let unlockedChannels = [];

            for (const channel of channels.values()) {
                for (const roleId of config.LOCK_ROLES) {
                    await channel.permissionOverwrites.edit(roleId, { SendMessages: true });
                }
                unlockedChannels.push(channel.name);

                if (config.ENABLE_EMBED_MESSAGE && channel.type === ChannelType.GuildText) {
                    const embedTemplate = config.embed_templates.unlockall;
                    const embed = new EmbedBuilder()
                        .setTitle(embedTemplate.title)
                        .setDescription(embedTemplate.description.replace('{user}', `<@${interaction.user.id}>`))
                        .setColor(embedTemplate.color)
                        .setFooter({ text: config.FOOTER_TEXT, iconURL: config.FOOTER_ICON })
                        .setTimestamp();

                    const sentMessage = await channel.send({ embeds: [embed] });

                    if (config.auto_delete_embed.enabled) {
                        setTimeout(() => {
                            sentMessage.delete().catch(console.error);
                        }, config.auto_delete_embed.interval * 1000); // Convert to milliseconds
                    }
                }
            }

            const replyContent = `🔓 All channels have been unlocked.`;
            await interaction.editReply({ content: replyContent });

            // Logging the action
            if (config.unlock.Enabled && config.unlock.LogsChannelID) {
                const logsChannel = await interaction.client.channels.fetch(config.unlock.LogsChannelID);
                if (logsChannel) {
                    const logEmbed = new EmbedBuilder()
                        .setTitle(config.unlock.Embed.Title)
                        .setDescription(
                            config.unlock.Embed.Description.map(line => line
                                .replace('{executor}', `<@${interaction.user.id}>`)
                                .replace('{channelName}', 'All text channels')
                                .replace('{longtime}', new Date().toLocaleString('en-US', { timeZone: 'UTC' }))
                                .replace('{shorttime}', new Date().toLocaleTimeString('en-US', { timeZone: 'UTC' }))
                            ).join('\n')
                        )
                        .setColor(config.unlock.Embed.Color)
                        .setFooter({ text: config.unlock.Embed.Footer, iconURL: config.FOOTER_ICON })
                        .setTimestamp();

                    if (config.unlock.Thumbnail) {
                        logEmbed.setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }));
                    }

                    await logsChannel.send({ embeds: [logEmbed] });
                }
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: 'There was an error trying to unlock all channels.' });
        }
    }
};
