// ==================== commands/menu.js ====================
import fs from 'fs';
import path from 'path';
import { contextInfo } from '../system/contextInfo.js';
import config from '../config.js';

// ===================== CONST BOT =====================
const BOT_NAME = '𝐓𝐇𝐄_𝐏𝐀𝐈𝐍-MD';
const BOT_SLOGAN = '> POWER BY 𓊈 𝐓𝐇𝐄 𝐏𝐀𝐈𝐍 𓊉';
const BOT_IMAGE = 'https://files.catbox.moe/10v9f5.jpg'; // Image du bot

// ===================== FORMAT UPTIME =====================
function formatUptime(ms) {
  const s = Math.floor(ms / 1000) % 60;
  const m = Math.floor(ms / (1000 * 60)) % 60;
  const h = Math.floor(ms / (1000 * 60 * 60)) % 24;
  const d = Math.floor(ms / (1000 * 60 * 60 * 24));
  return `${d}j ${h}h ${m}m ${s}s`;
}

// ===================== CHARGER COMMANDES =====================
async function loadCommands() {
  const commandsDir = path.join(process.cwd(), 'commands');
  const files = fs.readdirSync(commandsDir).filter(f => f.endsWith('.js'));

  const categories = {};

  for (const file of files) {
    try {
      const cmd = (await import(`./${file}`)).default;
      if (!cmd?.name) continue;

      const cat = (cmd.category || 'General').toUpperCase();
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(`.${cmd.name}`);
    } catch (err) {
      console.error('Erreur load command:', file, err.message);
    }
  }

  return categories;
}

// ===================== EXPORT =====================
export default {
  name: 'menu',
  aliases: ['help', 'cmds'],
  description: 'Affiche le menu complet du bot Dark Empire',
  category: 'info',

  async execute(sock, m) {
    const now = new Date();
    const time = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const date = now.toLocaleDateString('fr-FR');
    const uptime = formatUptime(Date.now() - global.botStartTime);
    const mode = global.mode?.toUpperCase() || 'PUBLIC';
    const user = m.sender.split('@')[0];

    const categories = await loadCommands();
    const totalCmds = Object.values(categories).reduce((a, b) => a + b.length, 0);

    // ===================== HEADER =====================
    let menuText = `
☠️☠️☠️ ${BOT_NAME} ☠️☠️☠️
╭─────────────────────
│ 💀 BOT    : ${BOT_NAME}
│ 👁️ USER   : @${user}
│ 🕰️ TIME   : ${time}
│ 📆 DATE   : ${date}
│ ⌛ UPTIME : ${uptime}
│ 🩸 MODE   : ${mode}
│ 🧠 CMDS  : ${totalCmds}
╰─────────────────────
`;

    // ===================== MENUS PAR CATÉGORIE =====================
    const sortedCats = Object.keys(categories).sort(
      (a, b) => categories[b].length - categories[a].length
    );

    const scaryEmoji = {
      GENERAL: '🩻',
      OWNER: '🔮',
      GROUPE: '☠️',
      UTILITAIRES: '🧊',
      FUN: '👁️‍🗨️',
      DEFAULT: '🕷️'
    };

    for (const cat of sortedCats) {
      const cmds = categories[cat];
      const emoji = scaryEmoji[cat] || scaryEmoji.DEFAULT;
      menuText += `
${emoji} 『 *\`${cat} 𝐌𝐄𝐍𝐔\`* 』
╭─────────────────────
│ ${cmds.join('\n│ ')}
╰─────────────────────
`;
    }

    menuText += `\n${BOT_SLOGAN}`;

    // ===================== ENVOI =====================
    await sock.sendMessage(
      m.chat,
      {
        image: { url: BOT_IMAGE },
        caption: menuText,
        contextInfo: {
          ...contextInfo,
          mentionedJid: [m.sender],
        },
      },
      { quoted: m }
    );
  },
};