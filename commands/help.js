const { EmbedBuilder } = require("discord.js");
const { PREFIX } = require("../config/config");

module.exports = {
  name: "help",
  description: "Show all available commands or details for one command.",
  usage: "!help [command]",

  async execute(message, args) {
    const commands = [...message.client.commands.values()].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    const requestedCommand = args[0]?.toLowerCase();

    if (requestedCommand) {
      const command = message.client.commands.get(requestedCommand);

      if (!command) {
        return message.reply(
          `I could not find a command named \`${requestedCommand}\`.`
        );
      }

      const embed = new EmbedBuilder()
        .setTitle(`Help: ${PREFIX}${command.name}`)
        .setColor("Blurple")
        .addFields(
          {
            name: "Description",
            value: command.description || "No description available."
          },
          {
            name: "Usage",
            value: command.usage || `${PREFIX}${command.name}`
          }
        );

      return message.channel.send({ embeds: [embed] });
    }

    const description = commands
      .map(command => {
        const summary = command.description || "No description available.";
        return `**${PREFIX}${command.name}** - ${summary}`;
      })
      .join("\n");

    const embed = new EmbedBuilder()
      .setTitle("CTFtime Bot Help")
      .setColor("Blurple")
      .setDescription(description)
      .setFooter({
        text: `Use ${PREFIX}help <command> for more details.`
      });

    return message.channel.send({ embeds: [embed] });
  }
};
