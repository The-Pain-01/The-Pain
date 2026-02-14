export default {
  name: "promote",
  async execute(sock, m) {
    if (!m.isGroup) return;
    if (!m.mentionedJid?.length) return;

    await sock.groupParticipantsUpdate(
      m.chat,
      m.mentionedJid,
      "promote"
    );

    await sock.sendMessage(m.chat, {
      text: `
╔═══〔 👑 ASCENSION NOCTURNE 👑 〕═══╗
🩸 Un être vient d’être élevé.
☠️ Son pouvoir grandit dans l’ombre.
╚════════════════════╝`
    });
  }
};