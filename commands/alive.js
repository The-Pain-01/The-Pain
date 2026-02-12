export default {
  name: 'alive',
  async execute(sock, m) {
    const BOT_NAME = global.BOT_NAME || '𝐓𝐇𝐄 𝐏𝐀𝐈𝐍-MD';
    const mode = global.mode || 'public';

    const text = `
⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻
☠️ ${BOT_NAME} ☠️
⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻

🤖 Status : ONLINE
⚙️ Mode : ${mode.toUpperCase()}
⏳ Uptime : ${Math.floor(process.uptime())}s

🩸 Le système est actif.
🧊 Accès contrôlé selon le mode.

> _The power of 𝐓𝐇𝐄_𝐏𝐀𝐈𝐍-MD flows through this bot_
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