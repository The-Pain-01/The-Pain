export default {
  name: 'menu',
  async execute(sock, m) {
    const uptime = process.uptime();
    const h = Math.floor(uptime / 3600);
    const min = Math.floor((uptime % 3600) / 60);
    const sec = Math.floor(uptime % 60);

    const BOT_NAME = global.BOT_NAME || '𝐓𝐇𝐄 𝐏𝐀𝐈𝐍-MD';
    const MODE = global.mode || 'public';

    const BOT_IMAGE = 'https://files.catbox.moe/10v9f5.jpg';

    const menu = `
╔══════════════════════╗
     ☠️  ${BOT_NAME}  ☠️
╚══════════════════════╝

╭─📡 BOT INFO
│ 🤖 Bot : ${BOT_NAME}
│ 👤 User : ${m.pushName || 'Utilisateur'}
│ 🧩 Commandes : ${Object.keys(global.commands || {}).length}
│ ⚙️ Mode : ${MODE}
│ ⏳ Uptime : ${h}h ${min}m ${sec}s
╰───────────────

🩸 DARK COMMANDS 🩸

╭─👁️ GÉNÉRAL
│ .alive
│ .botinfo
│ .menu
│ .mode
│ .mychannelid
│ .myid
│ .owner
│ .ping
│ .rules
│ .support
╰───────────────

╭─⚙️ PARAMÈTRES
│ .autoread on/off
│ .off
│ .on
│ .recording on/off
│ .setdesc
│ .setname
│ .typing on/off
╰───────────────

╭─🛡️ MODÉRATION
│ .antibot on/off
│ .antilink on/off
│ .ban
│ .mute
│ .purge
│ .unban
│ .unmute
│ .warn
╰───────────────

╭─👥 GROUPE
│ .add
│ .admins
│ .demote
│ .goodbye
│ .hidetag
│ .kick
│ .kickall
│ .left
│ .members
│ .online
│ .promote
│ .tag
│ .tagall
│ .welcome
╰───────────────

╭─🧊 UTILITAIRES
│ .save
│ .shorturl
│ .sticker
│ .toimg
│ .translate
│ .tts
│ .url
│ .vv
│ .take
╰───────────────

╭─☠️ FUN / DARK
│ .curse
│ .darkquote
│ .deathclock
│ .painfact
│ .shadow
│ .summon
│ .insult
╰───────────────

> POWER BY 🩸𝐓𝐇𝐄 𝐏𝐀𝐈𝐍🩸
`;

    await sock.sendMessage(
      m.chat,
      {
        image: { url: BOT_IMAGE },
        caption: menu,
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