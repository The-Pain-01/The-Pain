export default {
  name: 'deathclock',
  async execute(sock, m) {
    await sock.sendMessage(m.chat, {
      text: '⏳ Le temps s’écoule… pour tout le monde.'
    }, { quoted: m });
  }
};