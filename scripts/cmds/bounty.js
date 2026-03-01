const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "bounty",
    version: "1.0.0",
    role: 0,
    author: "TawHid_Bbz",
    description: "Set a bounty on someone",
    category: "psycho"
  },

  onStart: async function ({ api, event, message, usersData }) {
    const { threadID, messageID, mentions } = event;
    const targetID = Object.keys(mentions)[0];

    if (!targetID) return message.reply("বেবি, কার মাথার দাম দিতে হবে? 💀");

    const targetName = await usersData.getName(targetID);
    const imgURL = `https://graph.facebook.com/${targetID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
    const bountyURL = `https://api.popcat.xyz/wanted?image=${encodeURIComponent(imgURL)}`; 
    const path = __dirname + `/cache/bounty_${targetID}.png`;

    try {
      const response = await axios.get(bountyURL, { responseType: 'arraybuffer' });
      fs.writeFileSync(path, Buffer.from(response.data, 'binary'));

      let msg = `╭━━━『 𝗕𝗢𝗨𝗡𝗧𝗬 𝗛𝗨𝗡𝗧𝗘𝗥 』━━━╮\n`;
      msg += `│ 🩸 Target: ${targetName}\n`;
      msg += `│ 💰 Price: 1,000,000,000 BDT\n`;
      msg += `│ 💀 Order: Catch Dead or Alive!\n`;
      msg += `╰━━━━━━━━━━━━━━━━━━━╯`;

      return api.sendMessage({ body: msg, attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID);
    } catch (e) {
      return message.reply("বেবি, Tawhid baby এর সাথে কন্টাক্ট করো। 💀");
    }
  }
};
