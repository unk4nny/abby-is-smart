require("dotenv").config()

const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');


const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('HELP im bad'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('capybara').setDescription('yes')
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);