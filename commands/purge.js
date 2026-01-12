export default {
  name: 'purge',
  admin: true,
  async execute(sock, m) {
    await sock.sendMessage(m.chat, {
      text: '🩸 Le nettoyage est symbolique… pour l’instant.'
    }, { quoted: m });
  }
};