const { SlashCommandBuilder, PermissionsBitField, ChannelType, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const yaml = require('js-yaml');

const config = yaml.load(fs.readFileSync('./addons/ChannelManagement/config.yml', 'utf8'));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hide')
        .setDescription('Hides the current or specified channel')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to hide')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(false))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for hiding the channel')
                .setRequired(false)),
    async execute(interaction) {
        const member = interaction.member;
        const allowedRoles = config.command_permissions.hide;

        if (!member.roles.cache.some(role => allowedRoles.includes(role.id))) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const channel = interaction.options.getChannel('channel') || interaction.channel;
        const reason = interaction.options.getString('reason') || 'No reason provided';

        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return interaction.reply({ content: 'I do not have permission to manage channels.', ephemeral: true });
        }

        if (channel.type !== ChannelType.GuildText) {
            return interaction.reply({ content: 'You can only hide text channels.', ephemeral: true });
        }

        try {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                ViewChannel: false,
            });

            const embedTemplate = config.embed_templates.hide;
            const embed = new EmbedBuilder()
                .setTitle(embedTemplate.title)
                .setDescription(embedTemplate.description.replace('{channel}', channel).replace('{user}', `<@${interaction.user.id}>`))
                .addFields({ name: 'Reason', value: reason })
                .setColor(embedTemplate.color)
                .setFooter({ text: config.FOOTER_TEXT, iconURL: config.FOOTER_ICON })
                .setTimestamp();

            const sentMessage = await channel.send({ embeds: [embed] });

            if (config.auto_delete_embed.enabled) {
                setTimeout(() => {
                    sentMessage.delete().catch(console.error);
                }, config.auto_delete_embed.interval * 1000); // Convert to milliseconds
            }

            interaction.reply({ content: `🚫 ${channel} has been hidden.`, ephemeral: true });

            // Logging the action
            if (config.hide.Enabled && config.hide.LogsChannelID) {
                const logsChannel = await interaction.client.channels.fetch(config.hide.LogsChannelID);
                if (logsChannel) {
                    const logEmbed = new EmbedBuilder()
                        .setTitle(config.hide.Embed.Title)
                        .setDescription(
                            config.hide.Embed.Description.map(line => line
                                .replace('{executor}', `<@${interaction.user.id}>`)
                                .replace('{channelName}', `${channel}`)
                                .replace('{longtime}', new Date().toLocaleString('en-US', { timeZone: 'UTC' }))
                                .replace('{shorttime}', new Date().toLocaleTimeString('en-US', { timeZone: 'UTC' }))
                            ).join('\n')
                        )
                        .addFields({ name: 'Reason', value: reason })
                        .setColor(config.hide.Embed.Color)
                        .setFooter({ text: config.hide.Embed.Footer, iconURL: config.FOOTER_ICON })
                        .setTimestamp();

                    if (config.hide.Thumbnail) {
                        logEmbed.setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }));
                    }

                    await logsChannel.send({ embeds: [logEmbed] });
                }
            }
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'There was an error trying to hide the channel.', ephemeral: true });
        }
    }
};
