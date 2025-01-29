const { SlashCommandBuilder, PermissionsBitField, ChannelType, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const yaml = require('js-yaml');

const config = yaml.load(fs.readFileSync('./addons/ChannelManagement/config.yml', 'utf8'));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lockdown')
        .setDescription('Completely locks and hides all channels, and creates a lockdown channel')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels)
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for the lockdown')
                .setRequired(false)),
    async execute(interaction) {
        const member = interaction.member;
        const allowedRoles = config.command_permissions.lockdown;

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
            const avoidCategories = config.avoid_categories_lockdown;
            const channels = guild.channels.cache.filter(channel => 
                (channel.type === ChannelType.GuildText || 
                 channel.type === ChannelType.GuildVoice || 
                 channel.type === ChannelType.GuildForum) && 
                channel.viewable && 
                !avoidCategories.includes(channel.parentId)
            );

            let lockedChannels = [];

            for (const channel of channels.values()) {
                for (const roleId of config.LOCK_ROLES) {
                    await channel.permissionOverwrites.edit(roleId, { 
                        SendMessages: false,
                        ViewChannel: false,
                        Connect: false
                    });
                }
                lockedChannels.push(channel.name);
            }

            const lockdownChannel = await guild.channels.create({
                name: 'lockdown',
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {
                        id: guild.roles.everyone,
                        allow: [PermissionsBitField.Flags.ViewChannel],
                        deny: [PermissionsBitField.Flags.SendMessages]
                    }
                ]
            });

            const embedTemplate = config.embed_templates.lockdown;
            const embed = new EmbedBuilder()
                .setTitle(embedTemplate.title)
                .setDescription(embedTemplate.description.replace('{user}', `<@${interaction.user.id}>`))
                .setColor(embedTemplate.color)
                .addFields({ name: 'Reason', value: reason })
                .setFooter({ text: config.FOOTER_TEXT, iconURL: config.FOOTER_ICON })
                .setTimestamp();

            const sentMessage = await lockdownChannel.send({ embeds: [embed] });

            if (config.auto_delete_embed.enabled) {
                setTimeout(() => {
                    sentMessage.delete().catch(console.error);
                }, config.auto_delete_embed.interval * 1000); // Convert to milliseconds
            }

            const replyContent = `🔒 The server is now in lockdown mode. All channels are locked and hidden, except the lockdown channel.\nReason: ${reason}`;
            await interaction.editReply({ content: replyContent });

            // Logging the action
            if (config.lockdown.Enabled && config.lockdown.LogsChannelID) {
                const logsChannel = await interaction.client.channels.fetch(config.lockdown.LogsChannelID);
                if (logsChannel) {
                    const logEmbed = new EmbedBuilder()
                        .setTitle(config.lockdown.Embed.Title)
                        .setDescription(
                            config.lockdown.Embed.Description.map(line => line
                                .replace('{executor}', `<@${interaction.user.id}>`)
                                .replace('{longtime}', new Date().toLocaleString('en-US', { timeZone: 'UTC' }))
                                .replace('{shorttime}', new Date().toLocaleTimeString('en-US', { timeZone: 'UTC' }))
                            ).join('\n')
                        )
                        .addFields({ name: 'Reason', value: reason })
                        .setColor(config.lockdown.Embed.Color)
                        .setFooter({ text: config.lockdown.Embed.Footer, iconURL: config.FOOTER_ICON })
                        .setTimestamp();

                    if (config.lockdown.Thumbnail) {
                        logEmbed.setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }));
                    }

                    await logsChannel.send({ embeds: [logEmbed] });
                }
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: 'There was an error trying to lock down the server.' });
        }
    }
};
