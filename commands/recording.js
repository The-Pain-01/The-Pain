export default {
  name: 'recording',
  ownerOnly: true,
  async execute(sock, m, args) {
    global.botModes.recording = args[0] === 'on';
    await sock.sendMessage(m.chat, { text: '🎙️ Recording modifié.' }, { quoted: m });
  }
};