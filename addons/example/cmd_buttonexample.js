const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('testbutton')
        .setDescription('Test command!'),
    async execute(interaction, client) {

        const embed = new EmbedBuilder()
            .setColor(0xFFD580) 
            .setTitle('Test Embed') 
            .setDescription('This is a test embed with a button.'); 

     
        
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('primary') 
                    .setLabel('Click me!')
                    .setStyle(ButtonStyle.Primary),
            );


            await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });


        const filter = (i) => i.customId === 'primary' && i.user.id === interaction.user.id;


        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            if (i.customId === 'primary') {
                await i.deferUpdate();
                await interaction.followUp({ content: 'Hi!', ephemeral: true }); 
            }
        });

        collector.on('end', collected => {

        });
    }
};