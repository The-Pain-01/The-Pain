export default {
  name: 'insult',
  async execute(sock, m) {
    await sock.sendMessage(m.chat, {
      text: '😈 Même l’ombre te juge médiocre.'
    }, { quoted: m });
  }
};