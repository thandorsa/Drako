const { SlashCommandBuilder, PermissionsBitField, ChannelType, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const yaml = require('js-yaml');

const config = yaml.load(fs.readFileSync('./addons/ChannelManagement/config.yml', 'utf8'));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lockall')
        .setDescription('Locks all text channels in the server')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels)
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for locking all channels')
                .setRequired(false)),
    async execute(interaction) {
        const member = interaction.member;
        const allowedRoles = config.command_permissions.lockall;

        if (!member.roles.cache.some(role => allowedRoles.includes(role.id))) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const guild = interaction.guild;
        const reason = interaction.options.getString('reason') || 'No reason provided';

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

            let lockedChannels = [];

            for (const channel of channels.values()) {
                for (const roleId of config.LOCK_ROLES) {
                    await channel.permissionOverwrites.edit(roleId, { SendMessages: false });
                }
                lockedChannels.push(channel.name);

                if (config.ENABLE_EMBED_MESSAGE && channel.type === ChannelType.GuildText) {
                    const embedTemplate = config.embed_templates.lockall;
                    const embed = new EmbedBuilder()
                        .setTitle(embedTemplate.title)
                        .setDescription(embedTemplate.description.replace('{user}', `<@${interaction.user.id}>`))
                        .setColor(embedTemplate.color)
                        .addFields({ name: 'Reason', value: reason })
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

            const replyContent = `🔒 All channels have been locked.\nReason: ${reason}`;
            await interaction.editReply({ content: replyContent });

            // Logging the action
            if (config.lock.Enabled && config.lock.LogsChannelID) {
                const logsChannel = await interaction.client.channels.fetch(config.lock.LogsChannelID);
                if (logsChannel) {
                    const logEmbed = new EmbedBuilder()
                        .setTitle(config.lock.Embed.Title)
                        .setDescription(
                            config.lock.Embed.Description.map(line => line
                                .replace('{executor}', `<@${interaction.user.id}>`)
                                .replace('{channelName}', 'All text channels')
                                .replace('{longtime}', new Date().toLocaleString('en-US', { timeZone: 'UTC' }))
                                .replace('{shorttime}', new Date().toLocaleTimeString('en-US', { timeZone: 'UTC' }))
                            ).join('\n')
                        )
                        .addFields({ name: 'Reason', value: reason })
                        .setColor(config.lock.Embed.Color)
                        .setFooter({ text: config.lock.Embed.Footer, iconURL: config.FOOTER_ICON })
                        .setTimestamp();

                    if (config.lock.Thumbnail) {
                        logEmbed.setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }));
                    }

                    await logsChannel.send({ embeds: [logEmbed] });
                }
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: 'There was an error trying to lock all channels.' });
        }
    }
};
