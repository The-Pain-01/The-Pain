export default {
  name: 'curse',
  async execute(sock, m) {
    await sock.sendMessage(m.chat, {
      text: '☠️ Une malédiction symbolique t’enveloppe…'
    }, { quoted: m });
  }
};