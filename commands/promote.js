export default {
  name: 'promote',
  description: 'Donne le rôle admin à un membre',
  category: 'group',
  admin: true,
  async execute(sock, m, args) {
    if (!m.isGroup) return sock.sendMessage(m.chat, { text: '☠️ Fonctionne uniquement en groupe.' }, { quoted: m });
    if (!args[0]) return sock.sendMessage(m.chat, { text: '💀 Mentionne un membre.' }, { quoted: m });

    const member = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    await sock.groupParticipantsUpdate(m.chat, [member], 'promote');

    await sock.sendMessage(
      m.chat,
      { text: `
⚡ PROMOTION DARK ⚡
🕷️ Membre : @${args[0]}
☠️ Status : Admin des ténèbres
`, contextInfo: { mentionedJid: [member] } },
      { quoted: m }
    );
  },
};