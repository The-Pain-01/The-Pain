export default {
  name: 'owner',
  async execute(sock, m) {
    await sock.sendMessage(m.chat, {
      text: `
👑 MAÎTRE DE 𝐓𝐇𝐄_𝐏𝐀𝐈𝐍-MD 👑
📞 +27727500078
🩸 Celui qui invoque contrôle.
`
    }, { quoted: m });
  }
};