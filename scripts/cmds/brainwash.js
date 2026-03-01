const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "brainwash",
    version: "1.0.0",
    role: 0,
    author: "TawHid_Bbz",
    description: "Brainwash someone's profile",
    category: "psycho"
  },

  onStart: async function ({ api, event, message, usersData }) {
    const { threadID, messageID, mentions } = event;
    const targetID = Object.keys(mentions)[0] || event.senderID;
    const targetName = await usersData.getName(targetID);

    const imgURL = `https://graph.facebook.com/${targetID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
    const bwURL = `https://api.popcat.xyz/colorify?image=${encodeURIComponent(imgURL)}&color=cyan`; 
    const path = __dirname + `/cache/bw_${targetID}.png`;

    try {
      const response = await axios.get(bwURL, { responseType: 'arraybuffer' });
      fs.writeFileSync(path, Buffer.from(response.data, 'binary'));

      let msg = `╭━━━━『 𝗕𝗥𝗔𝗜𝗡𝗪𝗔𝗦𝗛 』━━━━╮\n`;
      msg += `│ 🧠 Target: ${targetName}\n`;
      msg += `│ ⚡ Status: Re-coding your mind...\n`;
      msg += `│ 💀 "Now you belong to TawHid!"\n`;
      msg += `╰━━━━━━━━━━━━━━━━━━━━╯`;

      return api.sendMessage({ body: msg, attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID);
    } catch (e) {
      return message.reply("বেবি, Tawhid baby এর সাথে কন্টাক্ট করো। 💀");
    }
  }
};
