export default {
  name: 'tagall',
  description: 'Mentionne tous les membres du groupe',
  category: 'group',
  admin: true,
  async execute(sock, m) {
    if (!m.isGroup) return sock.sendMessage(m.chat, { text: '☠️ Cette commande fonctionne uniquement en groupe.' }, { quoted: m });

    const meta = await sock.groupMetadata(m.chat);
    const members = meta.participants.map(p => p.id);

    const text = '☠️ ATTENTION ! Tous les membres sont pris dans les ténèbres :\n' +
      members.map((id) => `🕷️ @${id.split('@')[0]}`).join('\n');

    await sock.sendMessage(
      m.chat,
      { text, contextInfo: { mentionedJid: members } },
      { quoted: m }
    );
  },
};