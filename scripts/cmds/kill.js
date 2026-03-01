const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "kill",
    version: "1.0.0",
    role: 0,
    author: "TawHid_Bbz",
    description: "Kill someone in a psycho way",
    category: "psycho",
    guide: { en: "{pn} @mention" }
  },

  onStart: async function ({ api, event, message, usersData }) {
    const { threadID, messageID, mentions } = event;
    const victimID = Object.keys(mentions)[0];

    if (!victimID) return message.reply("বেবি, কাকে মারতে চাও তাকে তো মেনশন করো! 🔪");

    const victimName = await usersData.getName(victimID);
    const imgURL = `https://graph.facebook.com/${victimID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
    
    const psychoMsgs = [
      "I’ll watch the light leave your eyes... 🧛🏻‍♀️",
      "Don't worry, it'll be over soon. 🔪",
      "Your blood looks like art on my hands. 🩸",
      "I told you... Don't play with my mind! 💀"
    ];
    const randomMsg = psychoMsgs[Math.floor(Math.random() * psychoMsgs.length)];

    const path = __dirname + `/cache/kill_${victimID}.png`;
    const canvasURL = `https://api.popcat.xyz/ad?image=${encodeURIComponent(imgURL)}`; // এটা দিয়ে প্রোফাইল পিকচারকে একটি ফ্রেমের ভেতর দেখাবে

    try {
      const response = await axios.get(canvasURL, { responseType: 'arraybuffer' });
      fs.writeFileSync(path, Buffer.from(response.data, 'binary'));

      let msg = `╭━━━━『 𝗞𝗜𝗟𝗟𝗘𝗥 𝗫 』━━━━╮\n`;
      msg += `│ 🩸 Victim: ${victimName}\n`;
      msg += `│ 💀 Status: ${randomMsg}\n`;
      msg += `╰━━━━━━━━━━━━━━━━━━━━╯\n`;
      msg += `✨ 𝖣𝗈𝗇'𝗍 𝖯𝗅𝖺𝗒 𝖶𝗂𝗍𝗁 𝖬𝗒 𝖬𝗂𝗇𝖽!`;

      return api.sendMessage({ body: msg, attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID);
    } catch (e) {
      return message.reply("বেবি, Tawhid baby এর সাথে কন্টাক্ট করো। 💀");
    }
  }
};
