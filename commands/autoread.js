export default {
  name: 'autoread',
  ownerOnly: true,
  async execute(sock, m, args) {
    global.botModes.autoread.enabled = args[0] === 'on';
    await sock.sendMessage(m.chat, { text: '👁️ Autoread ajusté.' }, { quoted: m });
  }
};