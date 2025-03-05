const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Display bot info!'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Info')
            .setDescription('This is a bot that can do things')
            .setFooter({ text: 'This is a footer' });

        await interaction.reply({ embeds: [embed] });
    }
};
