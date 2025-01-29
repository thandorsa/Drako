const { SlashCommandBuilder, PermissionFlagsBits } = require('@discordjs/builders');

const colorMap = {
    'default': 0x05B7FF,
};

function formatText(text) {
    // Replace **text** with bold formatting
    text = text.replace(/\*\*(.*?)\*\*/g, '**$1**');

    // Replace > text with quoting formatting
    text = text.replace(/^> (.*?$)/gm, '> $1');

    return text;
}

// Define the allowed role IDs
const allowedRoles = [
    '881144818078715925',
    '881144818078715926',
    '881144818078715928',
    '881144818078715932',
    '881144818087112724',
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('easyembed')
        .setDescription('Sends a customized embed message.'),
    async execute(interaction) {
        const memberRoles = interaction.member.roles.cache;
        const hasAllowedRole = allowedRoles.some((roleID) => memberRoles.has(roleID));

        if (!hasAllowedRole) {
            return interaction.reply({ content: 'You do not have the required role to use this command.', ephemeral: true });
        }
        
        await interaction.reply({ content: 'Send your message to create an embed.', ephemeral: true });
        const filter = (response) => response.author.id === interaction.user.id;
        const userMessage = await interaction.channel.awaitMessages({
            max: 1,
            time: 60000,
            errors: ['time'],
            filter: filter,
        });

        if (userMessage.size === 0) {
            return interaction.followUp({ content: 'No message received in time. Command canceled.', ephemeral: true });
        }

        const messageContent = userMessage.first().content;
        const imageAttachments = userMessage.first().attachments;

        const lines = messageContent.split('\n');
        const title = lines[0]; 
        const text = formatText(lines.slice(1).join('\n'));

        if (!title.trim()) {
            return interaction.followUp({ content: 'Title cannot be empty. Command canceled.', ephemeral: true });
        }

        let colour = colorMap['default'];

        const embed = {
            color: colour,
            title: title,
            description: text,
            timestamp: new Date(),
        };

        if (imageAttachments && imageAttachments.size > 0) {
            const attachment = imageAttachments.first();
            embed.image = { url: attachment.url };
        }

        try {
            await userMessage.first().delete();
        } catch (error) {
            console.error('Error deleting user message:', error);
        }

        await interaction.channel.send({ embeds: [embed] });
    },
};