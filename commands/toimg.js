import { exec } from 'child_process';
import sharp from 'sharp';
import { tmpdir } from 'os';
import { join } from 'path';
import fs from 'fs';

export default {
  name: 'toimg',
  description: 'Convertit un sticker en image (.png) ou vidéo (.mp4) directement',
  execute: async (sock, m) => {
    if (!m.quoted || !m.quoted.mtype?.endsWith('Message')) {
      return sock.sendMessage(m.chat, { text: '❌ Réponds à un sticker.' });
    }

    const quoted = m.quoted;

    if (!quoted.mtype.includes('sticker')) {
      return sock.sendMessage(m.chat, { text: '❌ Ce n’est pas un sticker.' });
    }

    try {
      const buffer = await quoted.download();
      const isAnimated = quoted.message?.stickerMessage?.isAnimated;

      if (!isAnimated) {
        // Sticker image -> webp -> png en mémoire
        const imageBuffer = await sharp(buffer).png().toBuffer();
        await sock.sendMessage(m.chat, { image: imageBuffer });
      } else {
        // Sticker animé -> webm -> mp4 en mémoire via ffmpeg
        // On utilise un fichier temporaire car ffmpeg lit/écrit depuis disque
        const tmpInput = join(tmpdir(), `sticker_${Date.now()}.webm`);
        const tmpOutput = join(tmpdir(), `sticker_${Date.now()}.mp4`);
        fs.writeFileSync(tmpInput, buffer);

        await new Promise((resolve, reject) => {
          exec(
            `ffmpeg -i "${tmpInput}" -movflags faststart -pix_fmt yuv420p "${tmpOutput}" -y`,
            (err) => {
              if (err) return reject(err);
              resolve();
            }
          );
        });

        const videoBuffer = fs.readFileSync(tmpOutput);
        await sock.sendMessage(m.chat, { video: videoBuffer });

        fs.unlinkSync(tmpInput);
        fs.unlinkSync(tmpOutput);
      }

    } catch (err) {
      console.error('❌ Erreur dans toimg.js :', err);
      await sock.sendMessage(m.chat, { text: '❌ Impossible de convertir le sticker.' });
    }
  }
};