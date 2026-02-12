export default {
  name: 'support',
  async execute(sock, m) {
    const BOT_NAME = global.BOT_NAME || '𝐓𝐇𝐄 𝐏𝐀𝐈𝐍-MD';

    const text = `
⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻
☠️ ${BOT_NAME} SUPPORT ☠️
⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻

📢 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 𝐎𝐟𝐟𝐢𝐜𝐢𝐞𝐥 :
https://whatsapp.com/channel/0029Vb7FTvDICVfgeK27ul2S

👑 𝐂𝐨𝐧𝐭𝐚𝐜𝐭 𝐝𝐮 𝐌𝐚𝐢̂𝐭𝐫𝐞 :
+27727500078

🩸 Le Maître n’est pas invoqué pour des futilités.
⚠️ Réfléchis avant d’écrire… chaque message est vu.
☠️ Le silence est préférable si ta requête est inutile.

🛠️ Pour toute assistance officielle,
rejoins d’abord la Channel.

⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻
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