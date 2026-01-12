// ==================== commands/mychannelid.js ====================
export default {
  name: 'mychannelid',
  aliases: ['channelid'],
  description: 'Affiche l’ID de ton WhatsApp Channel en style Dark',
  category: 'info',

  async execute(sock, m, args) {
    try {
      // Vérifie si l'utilisateur a fourni le lien de son Channel
      const url = args[0];
      if (!url || !url.includes('https://whatsapp.com/channel/')) {
        return await sock.sendMessage(
          m.chat,
          { text: '💀 Usage : .mychannelid <lien_du_channel>\nEx: .mychannelid https://whatsapp.com/channel/0029Vb7FTvDICVfgeK27ul2S' },
          { quoted: m }
        );
      }

      // Extraire le code de la chaîne depuis l'URL
      const code = url.split('/').pop();
      const channelId = `${code}@newsletter`; // Format utilisé en API

      // Message Dark Empire
      const text = `
☠️ DARK CHANNEL ID ☠️
🕷️ Lien du Channel : ${url}
💀 Channel ID API : ${channelId}

🩸 Utilité : Cet ID peut être utilisé avec l’API officielle WhatsApp Cloud pour envoyer des messages automatiques.
`;

      await sock.sendMessage(
        m.chat,
        { text },
        { quoted: m }
      );

    } catch (err) {
      console.error('MyChannelID command error:', err);
      await sock.sendMessage(
        m.chat,
        { text: '☠️ Une erreur est survenue lors de la récupération de l’ID du Channel.' },
        { quoted: m }
      );
    }
  },
};