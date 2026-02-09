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

    await sock.sendMessage(
      m.chat,
      {
        text,
        contextInfo: {
          isForwarded: true,
          forwardingScore: 999,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363422649925479@newsletter',
            newsletterName: '⏤͟͟͞𝐓𝐇𝐄 亗 𝐏𝐀𝐈𝐍 亗 𝐓𝐄𝐂𝐇᭄',
            serverMessageId: 1
          }
        }
      },
      { quoted: m }
    );
  }
};