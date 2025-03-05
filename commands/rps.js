const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rps')
        .setDescription('rock paper scissors!')
        .addStringOption(option =>
            option.setName('choice')
                .setDescription('choose rock, paper, or scissors')
                .setRequired(true)
        ),
        async execute(interaction) {
            const choices = ['rock', 'paper', 'scissors'];
            const userChoice = interaction.options.getString('choice');
            const botChoice = choices[Math.floor(Math.random() * choices.length)];

            let result = '';
            if (userChoice === botChoice) {
                result = 'It\'s a tie!';
            } else if (
                (userChoice === 'rock' && botChoice === 'scissors') ||
                (userChoice === 'paper' && botChoice === 'rock') ||
                (userChoice === 'scissors' && botChoice === 'paper')
            ) {
                result = 'You win!';
            }
            else {
                result = 'You lose!';
            }
            await interaction.reply(`You chose ${userChoice}, I chose ${botChoice}. ${result}`);


        }
}