export default {
  name: 'url',
  async execute(sock, m) {
    try {
      // Vérifie s’il y a un message cité
      const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      if (!quoted)
        return sock.sendMessage(
          m.chat,
          { text: '☠️ Réponds à une image, vidéo ou audio pour extraire son URL.' },
          { quoted: m }
        );

      // Récupération du type de média
      const type = Object.keys(quoted)[0];
      const media = quoted[type];

      if (!media?.url)
        return sock.sendMessage(
          m.chat,
          { text: '🩸 Aucun lien détecté dans ce message.' },
          { quoted: m }
        );

      const text = `
╔══════════════════════╗
        ☠️ URL ☠️
╚══════════════════════╝

🔗 Lien du média :
${media.url}

🩸 ${global.BOT_NAME || 'THE_PAIN-MD'}
`;

      await sock.sendMessage(m.chat, { text }, { quoted: m });

    } catch (err) {
      console.error('URL CMD ERROR:', err);
      await sock.sendMessage(
        m.chat,
        { text: '💀 Une erreur obscure est survenue…' },
        { quoted: m }
      );
    }
  }
};