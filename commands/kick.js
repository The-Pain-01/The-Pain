export default {
  name: "kick",
  description: "Expulse un membre",
  admin: true,
  group: true,

  async execute(sock, m, args) {
    if (!m.isGroup) {
      return m.reply("❌ Cette commande est réservée aux groupes.");
    }

    if (!m.isAdmin) {
      return m.reply("❌ Seuls les admins peuvent utiliser cette commande.");
    }

    let user = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : null);

    if (!user) {
      return m.reply("⚠️ Mentionne un membre ou réponds à son message.");
    }

    await sock.groupParticipantsUpdate(
      m.chat,
      [user],
      "remove"
    );

    await sock.sendMessage(m.chat, {
      text: `👢 @${user.split("@")[0]} a été expulsé du royaume.`,
      mentions: [user]
    });
  }
};