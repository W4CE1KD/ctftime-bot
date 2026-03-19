const { EmbedBuilder } = require("discord.js");
const { getLive } = require("../utils/ctftime");
const { getContestLinks } = require("../utils/contestLinks");

module.exports = {
  name: "live",
  description: "Show CTF events that are running right now.",
  usage: "!live",

  async execute(message) {
    try {
      const events = await getLive();

      if (!events.length) {
        return message.reply("No live CTFs right now.");
      }

      const embed = new EmbedBuilder()
        .setTitle("Live CTFs")
        .setColor("Green");

      events.forEach(ctf => {
        const end = Math.floor(new Date(ctf.finish).getTime() / 1000);

        embed.addFields({
          name: ctf.title,
          value:
            getContestLinks(ctf) +
            `Ends: <t:${end}:R>\n` +
            `Team Size: ${ctf.restrictions || "Unknown"}`
        });
      });

      return message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      return message.reply("Error fetching live CTFs.");
    }
  }
};
