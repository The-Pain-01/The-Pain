export default {
  name: 'painfact',
  async execute(sock, m) {
    await sock.sendMessage(m.chat, {
      text: '🩸 La douleur forge les plus grandes légendes.'
    }, { quoted: m });
  }
};