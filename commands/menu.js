export default {
  name: 'menu',
  async execute(sock, m) {
    const uptime = process.uptime();
    const h = Math.floor(uptime / 3600);
    const min = Math.floor((uptime % 3600) / 60);
    const sec = Math.floor(uptime % 60);

    const BOT_NAME = global.BOT_NAME || 'THE PAIN';

    // ✅ IMAGE DIRECTEMENT DANS LE FICHIER
    const BOT_IMAGE = 'https://files.catbox.moe/10v9f5.jpg';

    const menu = `
╔══════════════════════╗
     ☠️  ${BOT_NAME}  ☠️
╚══════════════════════╝

╭─📡 BOT INFO
│ 👁️ Bot : ${BOT_NAME}
│ 👤 User : @${m.sender.split('@')[0]}
│ ⚙️ Mode : ${global.mode || 'public'}
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
│ .url
│ .translate
│ .tts
│ .save
╰───────────────

╭─☠️ FUN / DARK
│ .darkquote
│ .painfact
│ .curse
│ .insult
│ .shadow
│ .summon
│ .deathclock
╰───────────────

> POWER BY 🩸𝐓𝐇𝐄 𝐏𝐀𝐈𝐍🩸
`;

    await sock.sendMessage(
      m.chat,
      {
        image: { url: BOT_IMAGE },
        caption: menu,
        mentions: [m.sender]
      },
      { quoted: m }
    );
  }
};