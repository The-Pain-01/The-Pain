import { sticker } from 'some-sticker-lib'; // Remplace par ta lib sticker si tu en utilises une

export default {
  name: 'sticker',
  description: 'Crée un sticker à partir d’une image ou vidéo',
  category: 'utilitaires',
  async execute(sock, m) {
    try {
      if (!m.message.imageMessage && !m.message.videoMessage)
        return sock.sendMessage(m.chat, { text: '💀 Envoie une image ou vidéo pour créer un sticker.' }, { quoted: m });

      const buffer = m.message.imageMessage?.imageData || m.message.videoMessage?.videoData;
      const stkr = await sticker(buffer, { pack: '𝐓𝐇𝐄_𝐏𝐀𝐈𝐍-MD', author: 'Dark Empire' });

      await sock.sendMessage(
        m.chat,
        { sticker: stkr },
        { quoted: m }
      );
    } catch (err) {
      console.error(err);
      await sock.sendMessage(
        m.chat,
        { text: '☠️ Impossible de créer le sticker.' },
        { quoted: m }
      );
    }
  },
};