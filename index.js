const { Client, GatewayIntentBits, Collection} = require('discord.js')
const fs = require('fs')

require('dotenv').config();

const client = new Client( {
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
})

client.commands = new Collection();

// load the command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
}
)

client.once('ready', () => {
    console.log(`logged in as ${client.user.tag}`);
})

client.login(process.env.TOKEN)