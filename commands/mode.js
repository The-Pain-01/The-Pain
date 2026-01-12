export default {
  name: 'mode',
  async execute(sock, m) {
    await sock.sendMessage(m.chat, {
      text: `🧭 Mode actuel : ${global.mode}`
    }, { quoted: m });
  }
};