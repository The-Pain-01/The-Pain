export default {
  name: 'online',
  async execute(sock, m) {
    await sock.sendMessage(m.chat, {
      text: '🟢 Présence détectée…'
    }, { quoted: m });
  }
};