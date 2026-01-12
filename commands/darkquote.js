export default {
  name: 'darkquote',
  async execute(sock, m) {
    const quotes = [
      'La douleur est le seul langage que tout le monde comprend.',
      'Le silence fait plus peur que le cri.'
    ];
    await sock.sendMessage(m.chat, {
      text: `🩸 ${quotes[Math.floor(Math.random() * quotes.length)]}`
    }, { quoted: m });
  }
};