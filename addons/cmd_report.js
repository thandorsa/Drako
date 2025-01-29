const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// Load configuration
const CONFIG = {
    COOLDOWN_TIME: 300 * 1000, // Cooldown time in milliseconds.
    REPORT_CHANNEL_ID: 'CHANNEL_ID', // Replace with your report channel ID. This is where the report submissions will go for staff review.
    STAFF_ROLE_ID: 'ROLE_ID', // Replace with your staff role ID. This role is unreportable.
    MENTION_ROLE_ID: 'ROLE_ID', // Replace with the role ID to mention on report submission
    FOOTER_TEXT: 'FOOTER_TEXT', // Replace with the footer text
    FOOTER_ICON: 'LINK' // Replace with footer icon
};

// Cooldown map to keep track of command usage
const cooldowns = new Map();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Report a member')
        .addUserOption(option => 
            option.setName('member')
                .setDescription('The member to report')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('reason')
                .setDescription('The reason for reporting')
                .setRequired(true)
                .addChoices(
                    { name: 'Harassment', value: 'Harassment' },
                    { name: 'Spamming', value: 'Spamming' },
                    { name: 'NSFW Content', value: 'NSFW Content' },
                    { name: 'Racism', value: 'Racism' },
                    { name: 'Illegal Activities', value: 'Illegal Activities' },
                    { name: 'Discord ToS Violation', value: 'Discord ToS Violation' },
                    { name: 'Other', value: 'other' }
                ))
        .addAttachmentOption(option => 
            option.setName('proof')
                .setDescription('Any evidence or proof')
                .setRequired(false)),
    async execute(interaction) {
        const userId = interaction.user.id;

        // Check if the user is on cooldown
        if (cooldowns.has(userId)) {
            const expirationTime = cooldowns.get(userId) + CONFIG.COOLDOWN_TIME;
            if (Date.now() < expirationTime) {
                const timeLeft = (expirationTime - Date.now()) / 1000;
                return interaction.reply({ content: `Please wait ${timeLeft.toFixed(1)} more seconds before reusing the \`/report\` command.`, ephemeral: true });
            }
        }

        // Set the cooldown for the user
        cooldowns.set(userId, Date.now());
        setTimeout(() => cooldowns.delete(userId), CONFIG.COOLDOWN_TIME);

        const member = interaction.options.getUser('member');
        const reason = interaction.options.getString('reason');
        const attachment = interaction.options.getAttachment('proof');

        // Check if the reported user has the staff role
        const reportedGuildMember = interaction.guild.members.cache.get(member.id);
        if (reportedGuildMember.roles.cache.has(CONFIG.STAFF_ROLE_ID)) {
            return interaction.reply({ content: 'You cannot report a staff member.', ephemeral: true });
        }

        const reportEmbed = new EmbedBuilder()
            .setTitle('New Report')
            .setColor(0xFF0000)
            .addFields(
                { name: 'Reported User', value: `<@${member.id}> (${member.id})` },
                { name: 'Reason', value: reason },
                { name: 'Attachment', value: attachment ? `[View Attachment](${attachment.url})` : 'No attachment provided' }
            )
            .setTimestamp()
            .setFooter({
                text: CONFIG.FOOTER_TEXT,
                iconURL: CONFIG.FOOTER_ICON
            });

        const reportChannel = await interaction.client.channels.fetch(CONFIG.REPORT_CHANNEL_ID);
        const reportMessage = CONFIG.MENTION_ROLE_ID ? `<@&${CONFIG.MENTION_ROLE_ID}>` : '';
        await reportChannel.send({ content: reportMessage, embeds: [reportEmbed] });
        await interaction.reply({ content: 'Your report has been submitted.', ephemeral: true });
    }
};