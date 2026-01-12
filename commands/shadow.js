export default {
  name: 'shadow',
  async execute(sock, m) {
    await sock.sendMessage(m.chat, {
      text: '👁️‍🗨️ Une ombre se déplace derrière toi.'
    }, { quoted: m });
  }
};