import { getQuotedMedia } from '../system/getQuotedMedia.js';

export default {
  name: 'vv',
  description: 'Récupère un média en vue unique',
  category: 'dark',

  async execute(sock, m) {
    const media = getQuotedMedia(m);

    if (!media) {
      return sock.sendMessage(
        m.chat,
        { text: '☠️ Aucun média view-once détecté.\n➡️ Réponds au message.' },
        { quoted: m }
      );
    }

    await sock.sendMessage(
      m.chat,
      media.imageMessage
        ? { image: media, caption: '🩸 VIEW ONCE DÉVOILÉ 🩸' }
        : { video: media, caption: '🩸 VIEW ONCE DÉVOILÉ 🩸' },
      { quoted: m }
    );
  }
};