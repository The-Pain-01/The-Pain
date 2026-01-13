import { BOT_NAME, getBotImage } from '../botAssets.js';

export default {
  name: 'menu',
  async execute(sock, m) {
    const uptime = process.uptime();
    const h = Math.floor(uptime / 3600);
    const min = Math.floor((uptime % 3600) / 60);
    const sec = Math.floor(uptime % 60);

    const menu = `
╔══════════════════════╗
     ☠️  ${BOT_NAME}  ☠️
╚══════════════════════╝

╭─📡 BOT INFO
│ 👁️ Bot : ${BOT_NAME}
│ 👤 User : @${m.sender.split('@')[0]}
│ ⚙️ Mode : ${global.mode}
│ ⏳ Uptime : ${h}h ${min}m ${sec}s
╰───────────────

🩸 DARK COMMANDS 🩸

╭─👁️ GÉNÉRAL
│ .menu
│ .alive
│ .ping
│ .botinfo
│ .rules
│ .mode
│ .owner
│ .support
│ .myid
│ .mychannelid
╰───────────────

╭─⚙️ PARAMÈTRES
│ .on / .off
│ .setname
│ .setdesc
│ .autoread on/off
│ .typing on/off
│ .recording on/off
╰───────────────

╭─🛡️ MODÉRATION
│ .ban / .unban
│ .mute / .unmute
│ .warn
│ .purge
│ .antilink on/off
│ .antibot on/off
╰───────────────

╭─👥 GROUPE
│ .add
│ .kick
│ .kickall
│ .left
│ .promote
│ .demote
│ .admins
│ .members
│ .online
│ .hidetag
│ .tag
│ .tagall
│ .welcome
│ .goodbye
╰───────────────

╭─🧊 UTILITAIRES
│ .sticker
│ .toimg
│ .vv
│ .take
│ .shorturl
│ .translate
│ .tts
│ .save
│ .url
╰───────────────

╭─☠️ FUN / DARK
│ .darkquote
│ .painfact
│ .curse
│ .insult
│ .fear
│ .shadow
│ .summon
│ .deathclock
╰───────────────

> POWER BY 🩸𝐓𝐇𝐄 𝐏𝐀𝐈𝐍🩸
`;

    await sock.sendMessage(
      m.chat,
      {
        image: { url: getBotImage() },
        caption: menu,
        mentions: [m.sender]
      },
      { quoted: m }
    );
  }
};