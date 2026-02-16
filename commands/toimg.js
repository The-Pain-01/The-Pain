// ==================== commands/toimg.js ====================

export default {
  name: "toimg",
  description: "Convertit un sticker en image ou vidéo",

  async execute(sock, m) {
    try {
      const quoted = m.quoted;

      if (!quoted || quoted.mtype !== "stickerMessage") {
        return sock.sendMessage(m.chat, {
          text: "❌ Réponds à un sticker pour le convertir."
        }, { quoted: m });
      }

      const isAnimated = quoted.msg?.isAnimated;

      const buffer = await sock.downloadMediaMessage(quoted);

      if (isAnimated) {
        // 🎞 Sticker animé → vidéo
        await sock.sendMessage(m.chat, {
          video: buffer,
          caption: "🎞 Sticker animé converti en vidéo."
        }, { quoted: m });

      } else {
        // 🖼 Sticker normal → image
        await sock.sendMessage(m.chat, {
          image: buffer,
          caption: "🖼 Sticker converti en image."
        }, { quoted: m });
      }

    } catch (err) {
      console.error("Erreur toimg:", err);
      await sock.sendMessage(m.chat, {
        text: "❌ Erreur lors de la conversion."
      }, { quoted: m });
    }
  }
};