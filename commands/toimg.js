export default {
  name: 'toimg',
  description: 'Convertit un sticker en image',
  category: 'utilitaires',
  async execute(sock, m) {
    if (!m.message.stickerMessage) return sock.sendMessage(m.chat, { text: '💀 Envoie un sticker pour le convertir.' }, { quoted: m });

    // Ici tu convertis selon ta lib sticker -> image
    await sock.sendMessage(
      m.chat,
      { text: '☠️ Sticker converti en image (fonctionnalité à implémenter selon ta lib).' },
      { quoted: m }
    );
  },
};