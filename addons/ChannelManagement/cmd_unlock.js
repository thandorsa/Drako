const { SlashCommandBuilder, PermissionsBitField, ChannelType, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const yaml = require('js-yaml');

const config = yaml.load(fs.readFileSync('./addons/ChannelManagement/config.yml', 'utf8'));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('Unlocks the current or specified channel')
        .addChannelOption(option => 
            option.setName('channel')
                .setDescription('The channel to unlock')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(false)),
    async execute(interaction) {
        const member = interaction.member;
        const allowedRoles = config.command_permissions.unlock;

        if (!member.roles.cache.some(role => allowedRoles.includes(role.id))) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const channel = interaction.options.getChannel('channel') || interaction.channel;

        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return interaction.reply({ content: 'I do not have permission to manage channels.', ephemeral: true });
        }

        if (channel.type !== ChannelType.GuildText) {
            return interaction.reply({ content: 'You can only unlock text channels.', ephemeral: true });
        }

        try {
            for (const roleId of config.LOCK_ROLES) {
                await channel.permissionOverwrites.edit(roleId, { SendMessages: true });
            }

            const embedTemplate = config.embed_templates.unlock;
            const embed = new EmbedBuilder()
                .setTitle(embedTemplate.title)
                .setDescription(embedTemplate.description.replace('{channel}', channel).replace('{user}', `<@${interaction.user.id}>`))
                .setColor(embedTemplate.color)
                .setFooter({ text: config.FOOTER_TEXT, iconURL: config.FOOTER_ICON })
                .setTimestamp();

            const sentMessage = await channel.send({ embeds: [embed] });

            if (config.auto_delete_embed.enabled) {
                setTimeout(() => {
                    sentMessage.delete().catch(console.error);
                }, config.auto_delete_embed.interval * 1000); // Convert to milliseconds
            }

            interaction.reply({ content: `🔓 ${channel} has been unlocked.`, ephemeral: true });

            // Logging the action
            if (config.unlock.Enabled && config.unlock.LogsChannelID) {
                const logsChannel = await interaction.client.channels.fetch(config.unlock.LogsChannelID);
                if (logsChannel) {
                    const logEmbed = new EmbedBuilder()
                        .setTitle(config.unlock.Embed.Title)
                        .setDescription(
                            config.unlock.Embed.Description.map(line => line
                                .replace('{executor}', `<@${interaction.user.id}>`)
                                .replace('{channelName}', `${channel}`)
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
            interaction.reply({ content: 'There was an error trying to unlock the channel.', ephemeral: true });
        }
    }
};
