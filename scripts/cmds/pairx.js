const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "pairx",
    version: "1.0.5",
    role: 0,
    author: "TawHid_Bbz",
    countDown: 5,
    description: "Find your love",
    category: "love",
    guide: {
      en: "{pn}",
      bn: "{pn}"
    }
  },

  onStart: async function ({ api, event, usersData, message }) {
    const { threadID, senderID, messageID, participantIDs } = event;
    
    try {
      // নিজের আইডি এবং বটের আইডি বাদ দিয়ে বাকিদের লিস্ট করা
      const botID = api.getCurrentUserID();
      const list = participantIDs.filter(id => id != senderID && id != botID);
      
      if (list.length == 0) {
        return message.reply("বেবি, এই গ্রুপে তো তুমি ছাড়া আর কেউ নেই! কাকে খুঁজি? 💀");
      }

      // র‍্যান্ডম পার্টনার সিলেক্ট
      const partnerID = list[Math.floor(Math.random() * list.length)];

      const senderName = await usersData.getName(senderID);
      const partnerName = await usersData.getName(partnerID);
      const lovePercentage = Math.floor(Math.random() * 101);

      // প্রোফাইল পিকচারের লিঙ্ক
      const img1 = `https://graph.facebook.com/${senderID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
      const img2 = `https://graph.facebook.com/${partnerID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
      
      const messages = [
        "Your souls are locked together in a dark room. 🖤",
        "Death can't even separate this bond. 💀",
        "A match made in heaven, or maybe in hell? 🧛🏻‍♀️",
        "I’ll kill anyone who tries to come between you. 🔪",
        "Perfectly dangerous together. 🔥"
      ];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];

      let finalMsg = `╭━━━━━━━『 𝗟𝗢𝗩𝗘 𝗫 』━━━━━━━╮\n`;
      finalMsg += `│ 🧛🏻‍♀️ Partner: ${partnerName}\n`;
      finalMsg += `│ ❤️ Matching: ${lovePercentage}%\n`;
      finalMsg += `│ 💀 Status: ${randomMsg}\n`;
      finalMsg += `╰━━━━━━━━━━━━━━━━━━━━━━━╯\n`;
      finalMsg += `✨ Don't Play With My Mind!`;

      // ছবি ডাউনলোড এবং সেন্ড করা
      const path1 = __dirname + `/cache/p1_${senderID}.png`;
      const path2 = __dirname + `/cache/p2_${partnerID}.png`;

      const getImg1 = (await axios.get(img1, { responseType: 'arraybuffer' })).data;
      fs.writeFileSync(path1, Buffer.from(getImg1, 'utf-8'));
      
      const getImg2 = (await axios.get(img2, { responseType: 'arraybuffer' })).data;
      fs.writeFileSync(path2, Buffer.from(getImg2, 'utf-8'));

      return api.sendMessage({
        body: finalMsg,
        attachment: [fs.createReadStream(path1), fs.createReadStream(path2)]
      }, threadID, () => {
        if (fs.existsSync(path1)) fs.unlinkSync(path1);
        if (fs.existsSync(path2)) fs.unlinkSync(path2);
      }, messageID);

    } catch (e) {
      console.error(e);
      return message.reply("বেবি, কিছু একটা সমস্যা হয়েছে! দয়া করে Tawhid baby এর সাথে কন্টাক্ট করো। 💀");
    }
  }
};
