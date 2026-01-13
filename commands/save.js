export default {
  name: 'save',
  async execute(sock, m) {
    const q = m.quoted || m;
    const msg = q.message || {};
    const type = Object.keys(msg)[0];

    if (!type || !type.includes('Message')) {
      return sock.sendMessage(
        m.chat,
        { text: '📥 Réponds à une image, vidéo, audio ou document.' },
        { quoted: m }
      );
    }

    try {
      const buffer = await sock.downloadMediaMessage(q);
      const userJid = m.sender;

      await sock.sendMessage(userJid, {
        document: buffer,
        fileName: `THE_PAIN_MD_saved_${Date.now()}`,
        mimetype: msg[type].mimetype,
        caption: '🩸 *Média sauvegardé par THE_PAIN-MD*'
      });

      // Confirmation dans le chat d'origine
      await sock.sendMessage(
        m.chat,
        { text: '✅ Média envoyé en privé.' },
        { quoted: m }
      );

    } catch (err) {
      console.error(err);
      await sock.sendMessage(
        m.chat,
        { text: '❌ Impossible d’envoyer le média en privé. Ouvre le DM du bot.' },
        { quoted: m }
      );
    }
  }
};