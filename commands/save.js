import { getQuotedMedia } from '../system/getQuotedMedia.js';

export default {
  name: 'save',
  description: 'Sauvegarde un view-once en privé',
  category: 'dark',

  async execute(sock, m) {
    const media = getQuotedMedia(m);

    if (!media) {
      return sock.sendMessage(
        m.chat,
        { text: '☠️ Aucun média à sauvegarder.\n➡️ Réponds au message.' },
        { quoted: m }
      );
    }

    await sock.sendMessage(
      m.sender,
      media.imageMessage
        ? { image: media, caption: '🩸 MEDIA SAUVÉ 🩸' }
        : { video: media, caption: '🩸 MEDIA SAUVÉ 🩸' }
    );

    await sock.sendMessage(
      m.chat,
      { text: '☠️ Média envoyé en privé.' },
      { quoted: m }
    );
  }
};