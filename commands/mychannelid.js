export default {
  name: 'mychannelid',
  async execute(sock, m) {
    // Si la commande est utilisée dans une chaîne
    if (m.chat.endsWith('@newsletter')) {
      return sock.sendMessage(
        m.chat,
        {
          text: `🩸 𝗖𝗛𝗔𝗡𝗡𝗘𝗟 𝗜𝗗 🩸\n\n\`${m.chat}\``
        },
        { quoted: m }
      );
    }

    // Si la commande est utilisée en réponse à un message
    const quoted = m.message?.extendedTextMessage?.contextInfo?.remoteJid;
    if (quoted && quoted.endsWith('@newsletter')) {
      return sock.sendMessage(
        m.chat,
        {
          text: `🩸 𝗖𝗛𝗔𝗡𝗡𝗘𝗟 𝗜𝗗 🩸\n\n\`${quoted}\``
        },
        { quoted: m }
      );
    }

    // Sinon
    return sock.sendMessage(
      m.chat,
      {
        text:
          '❌ Aucune chaîne détectée.\n\n' +
          '➡️ Utilise la commande **dans une chaîne**\n' +
          'OU réponds à un message provenant d’une chaîne.'
      },
      { quoted: m }
    );
  }
};