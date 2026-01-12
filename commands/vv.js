// ==================== commands/vv.js ====================
export default {
  name: 'vv',
  description: 'Récupère une image/vidéo view-once dans le chat',
  category: 'utilitaires',

  async execute(sock, m) {
    try {
      const msg = m.message;
      if (!msg) return;

      // Vérifie si c'est un view-once
      const viewOnceMsg = msg.viewOnceMessage;
      if (!viewOnceMsg) {
        return await sock.sendMessage(
          m.chat,
          { text: '💀 Aucun média view-once trouvé dans ce message.' },
          { quoted: m }
        );
      }

      // Détecte si c'est image ou vidéo
      const media = viewOnceMsg.message.imageMessage || viewOnceMsg.message.videoMessage;
      if (!media) return;

      await sock.sendMessage(
        m.chat,
        {
          image: media.imageData ? { buffer: media.imageData } : undefined,
          video: media.videoData ? { buffer: media.videoData } : undefined,
          caption: '☠️ DARK VIEW-ONCE ☠️',
        },
        { quoted: m }
      );
    } catch (err) {
      console.error('VV command error:', err);
      await sock.sendMessage(
        m.chat,
        { text: '☠️ Impossible de récupérer le media view-once.' },
        { quoted: m }
      );
    }
  },
};