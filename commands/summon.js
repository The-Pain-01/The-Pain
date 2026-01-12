export default {
  name: 'summon',
  async execute(sock, m) {
    await sock.sendMessage(m.chat, {
      text: '🩸 Le rituel est symbolique… mais le frisson est réel.'
    }, { quoted: m });
  }
};