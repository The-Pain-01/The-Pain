export default {
  name: 'left',
  description: 'Fait quitter le bot du groupe',
  category: 'group',
  ownerOnly: true,
  async execute(sock, m) {
    if (!m.isGroup) return sock.sendMessage(m.chat, { text: '☠️ Fonctionne uniquement en groupe.' }, { quoted: m });

    await sock.sendMessage(m.chat, { text: '💀 Les ombres m’absorbent… le bot quitte le groupe.' }, { quoted: m });
    await sock.groupLeave(m.chat);
  },
};