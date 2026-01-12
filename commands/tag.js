export default {
  name: 'tag',
  description: 'Mentionne un membre du groupe',
  category: 'group',
  admin: true,
  async execute(sock, m, args) {
    if (!m.isGroup) return sock.sendMessage(m.chat, { text: '☠️ Cette commande fonctionne uniquement en groupe.' }, { quoted: m });
    if (!args[0]) return sock.sendMessage(m.chat, { text: '💀 Mentionne un membre à taguer.' }, { quoted: m });

    const member = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    await sock.sendMessage(
      m.chat,
      { text: `👁️‍🗨️ @${args[0]} tu es pris dans les ombres... ☠️`, contextInfo: { mentionedJid: [member] } },
      { quoted: m }
    );
  },
};