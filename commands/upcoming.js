const { EmbedBuilder } = require("discord.js");
const { getUpcoming } = require("../utils/ctftime");

module.exports = {
  name: "upcoming",

  async execute(message) {
    try {
      const events = await getUpcoming();

      if (!events.length)
        return message.reply("No upcoming CTFs found.");

      const embed = new EmbedBuilder()
        .setTitle("🔥 Upcoming CTF Events")
        .setColor("Blue");

      events.slice(0, 10).forEach(ctf => {

        // 🔥 FIX → convert ISO date → UNIX timestamp
        const start = Math.floor(new Date(ctf.start).getTime() / 1000);
        const end = Math.floor(new Date(ctf.finish).getTime() / 1000);

        embed.addFields({
          name: ctf.title,
          value:
            `🕒 Start: <t:${start}:F>\n` +
            `🏁 End: <t:${end}:F>\n` +
            `👥 Team Size: ${ctf.restrictions || "Unknown"}`
        });
      });

      message.channel.send({ embeds: [embed] });

    } catch (err) {
      console.error(err);
      message.reply("Error fetching CTF data.");
    }
  }
};
