const { EmbedBuilder } = require("discord.js");
const { getUpcoming } = require("../utils/ctftime");

module.exports = {
  name: "upcoming",

  async execute(message) {
    const events = await getUpcoming();

    if (!events.length)
      return message.reply("No upcoming CTFs found.");

    const embed = new EmbedBuilder()
      .setTitle("🔥 Upcoming CTF Events")
      .setColor("Blue");

    events.slice(0, 10).forEach(ctf => {
      embed.addFields({
        name: ctf.title,
        value:
          `🕒 Start: <t:${ctf.start}:F>\n` +
          `🏁 End: <t:${ctf.finish}:F>\n` +
          `👥 Team Size: ${ctf.restrictions || "Unknown"}`
      });
    });

    message.channel.send({ embeds: [embed] });
  }
};
