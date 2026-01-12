export default {
  name: 'kick',
  description: 'Expulse un membre du groupe',
  category: 'group',
  admin: true,
  async execute(sock, m, args) {
    if (!m.isGroup) return sock.sendMessage(m.chat, { text: '☠️ Cette commande fonctionne uniquement en groupe.' }, { quoted: m });
    if (!args[0]) return sock.sendMessage(m.chat, { text: '💀 Mentionne le membre à expulser.' }, { quoted: m });

    const member = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    await sock.groupParticipantsUpdate(m.chat, [member], 'remove');
    await sock.sendMessage(
      m.chat,
      { text: `
☠️ EXPULSION DARK ☠️
🕷️ Membre : @${args[0]}
💀 Status : Expulsé du groupe
` , contextInfo: { mentionedJid: [member] } },
      { quoted: m }
    );
  },
};