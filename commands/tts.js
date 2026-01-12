import gTTS from 'gtts.js'; // Exemple

export default {
  name: 'tts',
  description: 'Convertit un texte en audio',
  category: 'utilitaires',
  async execute(sock, m, args) {
    if (!args[0]) return sock.sendMessage(m.chat, { text: '💀 Texte manquant pour TTS.' }, { quoted: m });

    const text = args.join(' ');
    const tts = new gTTS(text, 'fr');
    const buffer = await tts.saveBuffer();

    await sock.sendMessage(
      m.chat,
      { audio: buffer, mimetype: 'audio/mp4', ptt: false },
      { quoted: m }
    );
  },
};