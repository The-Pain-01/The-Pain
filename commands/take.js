import { getQuotedMedia } from '../system/getQuotedMedia.js';

export default {
  name: 'take',
  description: 'Change le nom d’un sticker',
  category: 'utilitaires',

  async execute(sock, m, args) {
    const media = getQuotedMedia(m);

    if (!media || media.type !== 'sticker') {
      return sock.sendMessage(
        m.chat,
        { text: '☠️ Réponds à un STICKER pour utiliser .take' },
        { quoted: m }
      );
    }

    // Nom du pack
    const packname = args.join(' ') || '𝐓𝐇𝐄_𝐏𝐀𝐈𝐍-MD';
    const author = m.pushName || 'Dark User';

    await sock.sendMessage(
      m.chat,
      {
        sticker: media.data,
        packname: packname,
        author: author
      },
      { quoted: m }
    );
  }
};