export default {
  name: 'members',
  async execute(sock, m) {
    const meta = await sock.groupMetadata(m.chat);
    await sock.sendMessage(m.chat, {
      text: `👥 Membres : ${meta.participants.length}`
    }, { quoted: m });
  }
};