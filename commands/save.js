// ==================== commands/save.js ====================
export default {
  name: 'save',
  description: 'Sauvegarde un media view-once et l’envoie en privé à l’utilisateur',
  category: 'utilitaires',

  async execute(sock, m) {
    try {
      const msg = m.message;
      if (!msg) return;

      const viewOnceMsg = msg.viewOnceMessage;
      if (!viewOnceMsg) {
        return await sock.sendMessage(
          m.chat,
          { text: '💀 Aucun media view-once trouvé dans ce message.' },
          { quoted: m }
        );
      }

      const media = viewOnceMsg.message.imageMessage || viewOnceMsg.message.videoMessage;
      if (!media) return;

      await sock.sendMessage(
        m.sender,
        {
          image: media.imageData ? { buffer: media.imageData } : undefined,
          video: media.videoData ? { buffer: media.videoData } : undefined,
          caption: '☠️ DARK SAVE VIEW-ONCE ☠️',
        }
      );

      await sock.sendMessage(
        m.chat,
        { text: '🩸 Media view-once sauvegardé et envoyé en privé !' },
        { quoted: m }
      );

    } catch (err) {
      console.error('Save command error:', err);
      await sock.sendMessage(
        m.chat,
        { text: '☠️ Impossible de sauvegarder le media view-once.' },
        { quoted: m }
      );
    }
  },
};