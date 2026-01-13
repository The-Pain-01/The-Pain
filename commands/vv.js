export default {
  name: 'vv',
  async execute(sock, m) {
    if (!m.quoted) {
      return sock.sendMessage(m.chat, {
        text: '☠️ Réponds à une image ou vidéo *vue unique*.'
      }, { quoted: m });
    }

    const msg = m.quoted.message;
    const viewOnce =
      msg?.viewOnceMessageV2 ||
      msg?.viewOnceMessageV2Extension;

    if (!viewOnce) {
      return sock.sendMessage(m.chat, {
        text: '❌ Ce message n’est pas une vue unique.'
      }, { quoted: m });
    }

    const media =
      viewOnce.message.imageMessage ||
      viewOnce.message.videoMessage;

    if (!media) return;

    const buffer = await sock.downloadMediaMessage({ message: media });

    await sock.sendMessage(m.chat, {
      image: buffer,
      caption: '👁️ *Vue unique brisée*'
    }, { quoted: m });
  }
};