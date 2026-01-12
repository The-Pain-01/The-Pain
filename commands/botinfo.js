export default {
  name: 'botinfo',
  async execute(sock, m) {
    await sock.sendMessage(m.chat, {
      text: `
🤖 BOT INFO

Nom : 𝐓𝐇𝐄_𝐏𝐀𝐈𝐍-MD
Mode : ${global.mode}
Préfixe : ${global.PREFIX}
État : Glacial & éveillé
`
    }, { quoted: m });
  }
};