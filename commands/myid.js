// ==================== commands/myid.js ====================
export default {
  name: 'myid',
  aliases: ['id', 'chatid'],
  description: 'Affiche votre ID et l’ID du chat',
  category: 'info',

  async execute(sock, m) {
    try {
      const userId = m.sender; // ID de ton compte
      const chatId = m.chat;   // ID du chat ou groupe

      const text = `
☠️ DARK ID ☠️
🕷️ Ton ID : ${userId}
💀 ID du chat : ${chatId}

⚡ Utilité : Tu peux utiliser ces IDs pour configurer des commandes, des listes d’admins ou de whitelist.
`;

      await sock.sendMessage(
        m.chat,
        { text },
        { quoted: m }
      );

    } catch (err) {
      console.error('MyID command error:', err);
      await sock.sendMessage(m.chat, { text: '💀 Une erreur est survenue.' }, { quoted: m });
    }
  },
};