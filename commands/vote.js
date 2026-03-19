const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/votes.json");

module.exports = {
  name: "vote",
  description: "Vote for a CTF by name.",
  usage: "!vote <ctf_name>",

  execute(message, args) {
    if (!args.length) {
      return message.reply("Usage: !vote <ctf_name>");
    }

    const ctf = args.join(" ");

    let votes = {};
    if (fs.existsSync(filePath)) {
      votes = JSON.parse(fs.readFileSync(filePath));
    }

    if (!votes[ctf]) {
      votes[ctf] = [];
    }

    if (votes[ctf].includes(message.author.username)) {
      return message.reply("You already voted!");
    }

    votes[ctf].push(message.author.username);

    fs.writeFileSync(filePath, JSON.stringify(votes, null, 2));

    const list = votes[ctf].map(voter => `- ${voter}`).join("\n");

    return message.channel.send(`**Votes for ${ctf}**\n\n${list}`);
  }
};
