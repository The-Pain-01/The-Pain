export default {
  name: 'on',
  admin: true,
  async execute(sock, m) {
    global.disabledGroups.delete(m.chat);
    await sock.sendMessage(m.chat, { text: '🩸 𝐓𝐇𝐄_𝐏𝐀𝐈𝐍-MD est réveillé.' }, { quoted: m });
  }
};