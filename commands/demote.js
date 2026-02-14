export default {
  name: "demote",

  async execute(sock, m) {
    if (!m.isGroup) return;
    if (!m.mentionedJid?.length) {
      return sock.sendMessage(m.chat, {
        text: "☠️ Mentionne la cible à dégrader."
      });
    }

    const metadata = await sock.groupMetadata(m.chat).catch(() => null);
    const groupName = metadata?.subject || "Royaume Déchu";

    await sock.groupParticipantsUpdate(
      m.chat,
      m.mentionedJid,
      "demote"
    );

    for (let user of m.mentionedJid) {
      await sock.sendMessage(m.chat, {
        text: `
╔═══〔 ⛓ CHUTE PUBLIQUE ⛓ 〕═══╗
👁️ Groupe : *${groupName}*

💀 @${user.split("@")[0]} a perdu son trône.

📉 Autorité supprimée.
🩸 Respect : en chute libre.
😂 L’Empire a jugé… et l’Empire ne se trompe pas.

Que l’humiliation soit éternelle.
╚════════════════════╝
`,
        mentions: [user]
      });
    }
  }
};