const { EmbedBuilder } = require("discord.js");
const { getLive } = require("../utils/ctftime");

module.exports = {
  name: "live",

  async execute(message) {
    try {
      const events = await getLive();

      if (!events.length)
        return message.reply("No live CTFs right now.");

      const embed = new EmbedBuilder()
        .setTitle("🟢 LIVE CTFs RIGHT NOW")
        .setColor("Green");

      events.forEach(ctf => {

        const end = Math.floor(new Date(ctf.finish).getTime() / 1000);

        embed.addFields({
          name: ctf.title,
          value:
            `⏳ Ends: <t:${end}:R>\n` +
            `👥 Team Size: ${ctf.restrictions || "Unknown"}`
        });
      });

      message.channel.send({ embeds: [embed] });

    } catch (err) {
      console.error(err);
      message.reply("Error fetching live CTFs.");
    }
  }
};
