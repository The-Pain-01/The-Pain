import os from 'os';

export default {
  name: 'menu',
  aliases: ['help', 'cmds'],
  description: 'Menu principal ultra dark',
  async execute(sock, m) {
    const botName = '𝐓𝐇𝐄_𝐏𝐀𝐈𝐍-MD';
    const user = m.sender.split('@')[0];
    const time = new Date().toLocaleTimeString();
    const date = new Date().toLocaleDateString();
    const uptime = process.uptime();

    const formatUptime = (s) => {
      const h = Math.floor(s / 3600);
      const m = Math.floor((s % 3600) / 60);
      const sec = Math.floor(s % 60);
      return `${h}h ${m}m ${sec}s`;
    };

    const menu = `
☠️☠️☠️ 𝐓𝐇𝐄_𝐏𝐀𝐈𝐍-MD ☠️☠️☠️
╔════════════════════╗
🩸 BOT : ${botName}
👤 USER : ${user}
⏰ TIME : ${time}
📅 DATE : ${date}
⏳ UPTIME : ${formatUptime(uptime)}
⚙️ MODE : ${global.mode}
💻 RAM : ${(os.totalmem() / 1024 / 1024).toFixed(0)} MB
╚════════════════════╝

🩸━━━ 𝐃𝐀𝐑𝐊 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 ━━━🩸

🩻 【 GÉNÉRAL 】
➤ .menu
➤ .alive
➤ .ping
➤ .runtime
➤ .botinfo

🩸 【 OWNER 】
➤ .mode
➤ .block
➤ .unblock
➤ .ban
➤ .unban
➤ .restart

☠️ 【 GROUPE 】
➤ .kick
➤ .add
➤ .promote
➤ .demote
➤ .tagall
➤ .hidetag

🧊 【 UTILITAIRES 】
➤ .sticker
➤ .toimg
➤ .tts
➤ .translate
➤ .shorturl

👁️‍🗨️ 【 FUN / DARK 】
➤ .quote
➤ .darkfact
➤ .mystic
➤ .curse
➤ .truth

🩸━━━━━━━━━━━━━━━━🩸
> POWER BY 🩸𝐓𝐇𝐄 𝐏𝐀𝐈𝐍🩸
`;

    await sock.sendMessage(
      m.chat,
      {
        image: { url: 'https://files.catbox.moe/10v9f5.jpg' },
        caption: menu
      },
      { quoted: m }
    );
  }
};