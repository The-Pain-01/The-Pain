// ==================== commands/sticker.js ====================
import { writeFileSync, unlinkSync } from 'fs';
import path from 'path';
import { tmpdir } from 'os';
import { exec } from 'child_process';

export default {
  name: 'sticker',
  aliases: ['stiker', 's'],
  description: 'Crée un sticker à partir d\'une image ou vidéo',
  category: 'utilitaires',

  async execute(sock, m) {
    try {
      const msg = m.message;

      // Vérifie si c'est une image ou vidéo
      const imageMsg = msg.imageMessage || msg.documentMessage?.mimetype?.startsWith('image/');
      const videoMsg = msg.videoMessage;

      if (!imageMsg && !videoMsg) {
        return await sock.sendMessage(
          m.chat,
          { text: '💀 Veuillez envoyer une image ou une vidéo pour créer un sticker !' },
          { quoted: m }
        );
      }

      // Génère un fichier temporaire
      const tmpFile = path.join(tmpdir(), `sticker_${Date.now()}`);
      let ext = '';

      if (imageMsg) {
        const buffer = msg.imageMessage?.imageData || msg.documentMessage?.fileEncSha256;
        if (!buffer) return;
        ext = '.png';
        writeFileSync(tmpFile + ext, buffer);
      } else if (videoMsg) {
        const buffer = msg.videoMessage.videoData;
        if (!buffer) return;
        ext = '.mp4';
        writeFileSync(tmpFile + ext, buffer);
      }

      // Génère le sticker avec ffmpeg (nécessite ffmpeg installé)
      const output = tmpFile + '.webp';
      const ffmpegCmd =
        imageMsg
          ? `ffmpeg -y -i "${tmpFile + ext}" -vcodec libwebp -filter:v "scale=512:512:force_original_aspect_ratio=decrease" -lossless 1 -qscale 75 -preset default -an -vsync 0 "${output}"`
          : `ffmpeg -y -i "${tmpFile + ext}" -vcodec libwebp -filter:v "scale=512:512:force_original_aspect_ratio=decrease,fps=15" -lossless 0 -qscale 75 -preset default -an -vsync 0 "${output}"`;

      exec(ffmpegCmd, async (err) => {
        if (err) {
          console.error('Sticker command ffmpeg error:', err);
          return await sock.sendMessage(m.chat, { text: '☠️ Impossible de créer le sticker.' }, { quoted: m });
        }

        await sock.sendMessage(
          m.chat,
          { sticker: { url: output }, caption: '☠️ DARK STICKER ☠️' },
          { quoted: m }
        );

        // Supprime les fichiers temporaires
        try { unlinkSync(tmpFile + ext); unlinkSync(output); } catch {}
      });

    } catch (err) {
      console.error('Sticker command error:', err);
      await sock.sendMessage(
        m.chat,
        { text: '☠️ Une erreur est survenue lors de la création du sticker.' },
        { quoted: m }
      );
    }
  },
};