export default {
  name: 'unmute',
  admin: true,
  async execute(sock, m) {
    await sock.groupSettingUpdate(m.chat, 'not_announcement');
    await sock.sendMessage(m.chat, {
      text: '🔊 Les cris sont de retour.'
    }, { quoted: m });
  }
};