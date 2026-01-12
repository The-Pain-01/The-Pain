export default {
  name: 'typing',
  ownerOnly: true,
  async execute(sock, m, args) {
    global.botModes.typing = args[0] === 'on';
    await sock.sendMessage(m.chat, { text: '⌨️ Typing modifié.' }, { quoted: m });
  }
};