export default {
  name: 'sticker',
  async execute(sock, m) {
    if (!m.quoted || !m.quoted.message?.imageMessage) {
      return sock.sendMessage(m.chat, { text: '❌ Réponds à une image.' }, { quoted: m });
    }

    const media = await sock.downloadMediaMessage(m.quoted);

    await sock.sendMessage(
      m.chat,
      {
        sticker: media
      },
      { quoted: m }
    );
  }
};