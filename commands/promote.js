export default {
  name: "promote",

  async execute(sock, m) {
    if (!m.isGroup) return;
    if (!m.mentionedJid?.length) {
      return sock.sendMessage(m.chat, {
        text: "☠️ Mentionne la cible à élever."
      });
    }

    const metadata = await sock.groupMetadata(m.chat).catch(() => null);
    const groupName = metadata?.subject || "Royaume Obscur";

    await sock.groupParticipantsUpdate(
      m.chat,
      m.mentionedJid,
      "promote"
    );

    for (let user of m.mentionedJid) {
      await sock.sendMessage(m.chat, {
        text: `
╔═══〔 👑 ASCENSION IMPÉRIALE 👑 〕═══╗
👁️ Groupe : *${groupName}*

🩸 @${user.split("@")[0]} vient d’être élevé.

☠️ Le pouvoir lui est accordé.
🔥 Que son règne soit digne de l’Empire.
╚════════════════════╝
`,
        mentions: [user]
      });
    }
  }
};