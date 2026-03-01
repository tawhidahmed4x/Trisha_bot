const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "pairx",
    version: "1.0.2",
    role: 0,
    author: "TawHid_Bbz",
    countDown: 10,
    description: "Find your love",
    category: "love",
    guide: {
      en: "{pn}",
      bn: "{pn}"
    }
  },

  onStart: async function ({ api, event, threadsData, usersData, message }) {
    const { threadID, senderID, messageID } = event;
    
    try {
      const threadInfo = await api.getThreadInfo(threadID);
      const allMembers = threadInfo.participantIDs;

      const filteredMembers = allMembers.filter(id => id !== senderID && id !== api.getCurrentUserID());
      
      if (filteredMembers.length === 0) {
        return message.reply("বেবি, এই গ্রুপে তো তুমি ছাড়া আর কেউ নেই! কাকে খুঁজি? 💀");
      }

      const partnerID = filteredMembers[Math.floor(Math.random() * filteredMembers.length)];

      const senderName = await usersData.getName(senderID);
      const partnerName = await usersData.getName(partnerID);
      const lovePercentage = Math.floor(Math.random() * 101);

      const imageURL = `https://graph.facebook.com/${senderID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
      const partnerURL = `https://graph.facebook.com/${partnerID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
      
      const messages = [
        "Your souls are locked together in a dark room. 🖤",
        "Death can't even separate this bond. 💀",
        "A match made in heaven, or maybe in hell? 🧛🏻‍♀️",
        "I’ll kill anyone who tries to come between you. 🔪",
        "Perfectly dangerous together. 🔥"
      ];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];

      const path = __dirname + `/cache/pair_${senderID}.png`;
      const canvasURL = `https://api.popcat.xyz/ship?user1=${encodeURIComponent(imageURL)}&user2=${encodeURIComponent(partnerURL)}`;

      const response = await axios.get(canvasURL, { responseType: 'arraybuffer' });
      fs.ensureDirSync(__dirname + "/cache/");
      fs.writeFileSync(path, Buffer.from(response.data, 'binary'));

      let finalMsg = `╭━━━━━━━『 𝗟𝗢𝗩𝗘 𝗫 』━━━━━━━╮\n`;
      finalMsg += `│ 🧛🏻‍♀️ 𝖯𝖺𝗋𝗍𝗇𝖾𝗋: ${partnerName}\n`;
      finalMsg += `│ ❤️ 𝖬𝖺𝗍𝖼𝗁𝗂𝗇𝗀: ${lovePercentage}%\n`;
      finalMsg += `│ 💀 𝖲𝗍𝖺𝗍𝗎𝗌: ${randomMsg}\n`;
      finalMsg += `╰━━━━━━━━━━━━━━━━━━━━━━━╯\n`;
      finalMsg += `✨ 𝖣𝗈𝗇'𝗍 𝖯𝗅𝖺𝗒 𝖶𝗂𝗍ʜ 𝖬𝗒 𝖬𝗂𝗇𝖽!`;

      return api.sendMessage({
        body: finalMsg,
        attachment: fs.createReadStream(path)
      }, threadID, () => {
        if (fs.existsSync(path)) fs.unlinkSync(path);
      }, messageID);

    } catch (e) {
      console.error(e);
      // তোমার রিকোয়েস্ট অনুযায়ী এরর মেসেজটি বদলে দিলাম
      return message.reply("বেবি, কিছু একটা সমস্যা হয়েছে! দয়া করে Tawhid baby এর সাথে কন্টাক্ট করো। 💀");
    }
  }
};
