export default {
  name: 'support',
  async execute(sock, m) {
    const text = `
☠️ 𝐓𝐇𝐄_𝐏𝐀𝐈𝐍-MD — SUPPORT ☠️

📢 Chaîne officielle :
https://whatsapp.com/channel/0029Vb7FTvDICVfgeK27ul2S

👑 Contact du Maître :
+27727500078

🩸 Ne dérange pas le maître inutilement.
`;
    await sock.sendMessage(m.chat, { text }, { quoted: m });
  }
};