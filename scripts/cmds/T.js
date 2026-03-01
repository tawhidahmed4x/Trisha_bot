module.exports = {
  config: {
    name: "t",
    version: "1.0.0",
    role: 0,
    author: "TawHid_Bbz", // তোমার নাম সেট করে দিলাম
    description: "বটের মেসেজ আনসেন্ট করার জন্য রিপ্লাইতে T লিখুন",
    category: "system",
    guide: {
      en: "Reply to bot's message with 'T' to unsend it."
    }
  },

  onChat: async function ({ api, event }) {
    const { messageReply, body, threadID, messageID } = event;

    // যদি মেসেজ বডি 'T' অথবা 't' হয় এবং এটি বটের মেসেজের রিপ্লাই হয়
    if ((body.toLowerCase() === "t") && messageReply && messageReply.senderID == api.getCurrentUserID()) {
      return api.unsendMessage(messageReply.messageID);
    }
  }
};
