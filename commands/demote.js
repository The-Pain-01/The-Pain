export default {
  name: 'demote',
  description: 'Retire le rôle admin d’un membre',
  category: 'group',
  admin: true,
  async execute(sock, m, args) {
    if (!m.isGroup) return sock.sendMessage(m.chat, { text: '☠️ Fonctionne uniquement en groupe.' }, { quoted: m });
    if (!args[0]) return sock.sendMessage(m.chat, { text: '💀 Mentionne un membre.' }, { quoted: m });

    const member = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    await sock.groupParticipantsUpdate(m.chat, [member], 'demote');

    await sock.sendMessage(
      m.chat,
      { text: `
☠️ DÉMOTION DARK ☠️
🕷️ Membre : @${args[0]}
💀 Status : Admin retiré
`, contextInfo: { mentionedJid: [member] } },
      { quoted: m }
    );
  },
};