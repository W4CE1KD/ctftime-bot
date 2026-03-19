const { EmbedBuilder } = require("discord.js");
const { getUpcoming } = require("../utils/ctftime");
const { getContestLinks } = require("../utils/contestLinks");

module.exports = {
  name: "upcoming",
  description: "Show upcoming CTF events from CTFtime.",
  usage: "!upcoming",

  async execute(message) {
    try {
      const events = await getUpcoming();

      if (!events.length) {
        return message.reply("No upcoming CTFs found.");
      }

      const embed = new EmbedBuilder()
        .setTitle("Upcoming CTF Events")
        .setColor("Blue");

      events.slice(0, 10).forEach(ctf => {
        const start = Math.floor(new Date(ctf.start).getTime() / 1000);
        const end = Math.floor(new Date(ctf.finish).getTime() / 1000);

        embed.addFields({
          name: ctf.title,
          value:
            getContestLinks(ctf) +
            `Start: <t:${start}:F>\n` +
            `End: <t:${end}:F>\n` +
            `Team Size: ${ctf.restrictions || "Unknown"}`
        });
      });

      return message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      return message.reply("Error fetching CTF data.");
    }
  }
};
