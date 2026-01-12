export default {
  name: 'rules',
  async execute(sock, m) {
    await sock.sendMessage(m.chat, {
      text: `
📜 RÈGLES — 𝐓𝐇𝐄_𝐏𝐀𝐈𝐍-MD

• Respect ou silence
• Pas de spam
• Pas de chaos inutile
• Le bot observe
`
    }, { quoted: m });
  }
};