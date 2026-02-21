const fs = require("fs");
const path = require("path");
const { Client, GatewayIntentBits } = require("discord.js");
const { TOKEN, PREFIX } = require("./config/config");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Map();

const commandFiles = fs
  .readdirSync("./commands")
  .filter(f => f.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command = client.commands.get(cmd);
  if (!command) return;

  try {
    command.execute(message, args);
  } catch (err) {
    console.error(err);
  }
});

client.login(TOKEN);
