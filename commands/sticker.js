export default {
  name: 'sticker',
  async execute(sock, m) {
    const q = m.quoted || m;

    if (!q.message?.imageMessage) {
      return sock.sendMessage(m.chat, {
        text: '🧊 Réponds à une image pour créer un sticker.'
      }, { quoted: m });
    }

    const buffer = await sock.downloadMediaMessage(q);

    await sock.sendMessage(m.chat, {
      sticker: buffer
    }, { quoted: m });
  }
};