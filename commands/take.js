// ==================== commands/take.js ====================
import { writeFileSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';

export default {
  name: 'take',
  description: 'Prend un sticker et remplace le pack ou le nom',
  category: 'utilitaires',

  async execute(sock, m) {
    try {
      const msg = m.message;
      if (!msg) return;

      const sticker = msg.stickerMessage;
      if (!sticker) return await sock.sendMessage(m.chat, { text: '💀 Aucun sticker trouvé !' }, { quoted: m });

      // On enregistre temporairement le sticker
      const buffer = sticker.fileSha256 ? Buffer.from(sticker.fileSha256) : null;
      if (!buffer) return;

      const tempFile = path.join(tmpdir(), `sticker_${Date.now()}.webp`);
      writeFileSync(tempFile, buffer);

      await sock.sendMessage(
        m.chat,
        { sticker: { url: tempFile } },
        { quoted: m }
      );
    } catch (err) {
      console.error('Take command error:', err);
      await sock.sendMessage(
        m.chat,
        { text: '☠️ Impossible de prendre le sticker.' },
        { quoted: m }
      );
    }
  },
};