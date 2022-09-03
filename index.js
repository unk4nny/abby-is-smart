import { config } from 'dotenv';
import { Client, GatewayIntentBits, MessagePayload } from 'discord.js';
import axios from "axios"

config()

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('pong!');
	} else if (commandName === 'server') {
		await interaction.reply('Server info.');
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	} else if (commandName === 'capybara') {
		await capy(interaction)
	}
});

// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);
// If it uses await use async yes big brain
async function capy(interaction) {
	const response = await axios.get("https://api.capy.lol/v1/capybara/", {
        responseType: 'arraybuffer'
    })
	const image = response.data
	await interaction.reply(new MessagePayload(interaction,{files: [image]}))
}