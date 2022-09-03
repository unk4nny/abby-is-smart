import { config } from "dotenv";

import {
  SlashCommandBuilder,
  Routes,
  SlashCommandUserOption,
} from "discord.js";
import { REST } from "@discordjs/rest";

config();

const commands = [
  new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Sends a user avatar")
    .addUserOption(
      (option) =>
        option
          .setName("user")
          .setDescription(
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
          )
      // .setRequired()
    ),
  new SlashCommandBuilder()
    .setName("capybara")
    .setDescription("Sends a Capybara image!"),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

rest
  .put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID,
      process.env.GUILD_ID
    ),
    { body: commands }
  )
  .then((data) =>
    console.log(`Successfully registered ${data.length} application commands.`)
  )
  .catch(console.error);
