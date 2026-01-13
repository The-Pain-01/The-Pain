export default {
  name: 'tts',
  async execute(sock, m, args) {
    if (!args.length)
      return sock.sendMessage(m.chat, { text: '❌ Texte manquant.' }, { quoted: m });

    const text = encodeURIComponent(args.join(' '));

    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${text}&tl=fr&client=tw-ob`;

    await sock.sendMessage(
      m.chat,
      {
        audio: { url },
        mimetype: 'audio/mpeg',
        ptt: true
      },
      { quoted: m }
    );
  }
};