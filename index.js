import { config } from "dotenv";
import { Client, GatewayIntentBits, MessagePayload } from "discord.js";
import axios from "axios";

config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === "avatar") {
    await avi(interaction);
  } else if (commandName === "capybara") {
    await capy(interaction);
  }
});

// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);
// If it uses await use async yes big brain
async function capy(interaction) {
  const response = await axios.get("https://api.capy.lol/v1/capybara/", {
    responseType: "arraybuffer",
  });
  const image = response.data;
  await interaction.reply(new MessagePayload(interaction, { files: [image] }));
}

async function avi(interaction) {
  const user = interaction.options.getUser("user");
  if (user) {
    const avatar = user.avatarURL();
    await interaction.reply(avatar);
  } else {
    const avatar = interaction.member.avatarURL();
    await interaction.reply(avatar);
  }
}
