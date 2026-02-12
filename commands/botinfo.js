export default {
  name: 'botinfo',
  async execute(sock, m) {
    const BOT_NAME = global.BOT_NAME || '𝐓𝐇𝐄 𝐏𝐀𝐈𝐍-MD';
    const mode = global.mode || 'public';

    const text = `
☠️ ${BOT_NAME} ☠️

🤖 Bot : ${BOT_NAME}
🧩 Commands : ${Object.keys(global.commands || {}).length || '—'}
⚙️ Mode : ${mode.toUpperCase()}
⏳ Uptime : ${Math.floor(process.uptime())}s

🩸 Système stable
🧊 Contrôle total actif
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