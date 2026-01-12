export default {
  name: 'mute',
  admin: true,
  async execute(sock, m) {
    await sock.groupSettingUpdate(m.chat, 'announcement');
    await sock.sendMessage(m.chat, {
      text: '🔇 Les voix sont étouffées.'
    }, { quoted: m });
  }
};