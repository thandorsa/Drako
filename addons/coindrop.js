const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const User = require('../models/UserData');

const config = {
    allowedChannels: ['1264328522198159506'], // Channels the event will spawn in, use multiple for a random channel
    minIntervalSeconds: 300, // Minimum 30 seconds between drops
    maxIntervalSeconds: 900, // Maximum 5 minutes between drops
    claimTimeoutSeconds: 30, // 15 seconds to claim
    minCoins: 10,
    maxCoins: 10000
};

const lang = {
    title: '💰 Coin Drop!',
    description: 'A bag of {amount} coins has appeared!',
    footer: 'Coin Drop | Drako Bot',
    unclaimed: 'No one claimed the coins 😔',
    claimed: '{user} claimed {amount} coins!',
    success: 'You claimed {amount} coins! 💰',
    buttonLabel: 'Claim Coins'
};

let coinMessageId = null;

function getRandomInterval() {
    return Math.floor(Math.random() * (config.maxIntervalSeconds - config.minIntervalSeconds + 1) + config.minIntervalSeconds) * 1000;
}

async function spawnCoin(client) {
    const channelId = config.allowedChannels[Math.floor(Math.random() * config.allowedChannels.length)];
    const channel = await client.channels.fetch(channelId);

    if (!channel) {
        console.log(`Failed to fetch channel ${channelId}`);
        return;
    }

    const coinAmount = Math.floor(Math.random() * (config.maxCoins - config.minCoins + 1) + config.minCoins);

    const embed = new EmbedBuilder()
        .setColor('#FFD700')
        .setTitle(lang.title)
        .setDescription(lang.description.replace('{amount}', coinAmount))
        .setFooter({ text: lang.footer })
        .setTimestamp();

    const button = new ButtonBuilder()
        .setCustomId('claim_coins')
        .setLabel(lang.buttonLabel)
        .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(button);

    const sentMessage = await channel.send({ embeds: [embed], components: [row] });
    coinMessageId = sentMessage.id;

    setTimeout(() => {
        if (coinMessageId === sentMessage.id) {
            embed.setDescription(lang.unclaimed);
            sentMessage.edit({ embeds: [embed], components: [] });
            coinMessageId = null;
        }
    }, config.claimTimeoutSeconds * 1000);

}

function scheduleNextDrop(client) {
    const interval = getRandomInterval();
    setTimeout(() => {
        spawnCoin(client).then(() => scheduleNextDrop(client));
    }, interval);
}

module.exports.run = async (client) => {
    console.log("Coin Drop addon loaded!");

    scheduleNextDrop(client);

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isButton() || interaction.customId !== 'claim_coins') return;

        if (coinMessageId && interaction.message.id === coinMessageId) {
            await interaction.deferUpdate();

            let user = await User.findOne({ userId: interaction.user.id, guildId: interaction.guild.id });
            if (!user) {
                user = new User({ userId: interaction.user.id, guildId: interaction.guild.id, balance: 0 });
            }

            const coinAmount = Math.floor(Math.random() * (config.maxCoins - config.minCoins + 1) + config.minCoins);
            user.balance += coinAmount;
            user.transactionLogs.push({
                type: 'coin_drop',
                amount: coinAmount,
                timestamp: new Date()
            });
            await user.save();

            const claimedEmbed = new EmbedBuilder()
                .setColor('#FFD700')
                .setDescription(lang.claimed.replace('{user}', `<@${interaction.user.id}>`).replace('{amount}', coinAmount))
                .setFooter({ text: lang.footer })
                .setTimestamp();

            await interaction.message.edit({ embeds: [claimedEmbed], components: [] });
            coinMessageId = null;

            await interaction.followUp({ content: lang.success.replace('{amount}', coinAmount), ephemeral: true });
        }
    });
};