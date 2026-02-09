import { getQuotedMedia } from '../system/getQuotedMedia.js';

export default {
  name: 'sticker',
  aliases: ['s'],
  description: 'Crée un sticker à partir d’une image ou vidéo normale',
  category: 'utilitaires',

  async execute(sock, m) {
    const media = getQuotedMedia(m);

    // ❌ Rien cité
    if (!media) {
      return sock.sendMessage(
        m.chat,
        { text: '☠️ Réponds à une IMAGE ou VIDÉO.' },
        { quoted: m }
      );
    }

    // ❌ Refuse view-once
    if (media.fromViewOnce) {
      return sock.sendMessage(
        m.chat,
        { text: '🛑 Les médias view-once sont interdits pour .sticker.' },
        { quoted: m }
      );
    }

    // ❌ Refuse sticker
    if (media.type === 'sticker') {
      return sock.sendMessage(
        m.chat,
        { text: '☠️ Ce média est déjà un sticker.\nUtilise .take.' },
        { quoted: m }
      );
    }

    // ✅ Autorisé : image / vidéo normale
    if (media.type !== 'image' && media.type !== 'video') {
      return sock.sendMessage(
        m.chat,
        { text: '☠️ Média non supporté.' },
        { quoted: m }
      );
    }

    await sock.sendMessage(
      m.chat,
      {
        sticker: media.data,
        packname: '𝐓𝐇𝐄_𝐏𝐀𝐈𝐍-MD',
        author: m.pushName || 'Dark User'
      },
      { quoted: m }
    );
  }
};