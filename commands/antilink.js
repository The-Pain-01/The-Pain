export default {
  name: 'antilink',
  description: 'Supprime les messages contenant des liens',
  category: 'group',
  admin: true,
  async execute(sock, m) {
    if (!m.isGroup) return;
    const text = m.body || '';
    const regex = /https?:\/\/\S+/gi;

    if (regex.test(text)) {
      await sock.sendMessage(
        m.chat,
        { text: `☠️ @${m.sender.split('@')[0]} Les liens sont interdits dans ce groupe !` , contextInfo:{mentionedJid:[m.sender]} },
        { quoted: m }
      );
      await sock.deleteMessage(m.chat, { id: m.key.id, remoteJid: m.chat });
    }
  },
};