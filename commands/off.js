export default {
  name: 'off',
  admin: true,
  async execute(sock, m) {
    global.disabledGroups.add(m.chat);
    await sock.sendMessage(m.chat, { text: '❄️ 𝐓𝐇𝐄_𝐏𝐀𝐈𝐍-MD replonge dans le silence.' }, { quoted: m });
  }
};