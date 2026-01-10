// ==================== alive.js ====================

export default {
  name: 'alive',
  alias: ['status', 'bot'],
  description: 'Vérifie si le bot est en ligne, version DARK & EMPIRE',
  category: 'info',

  async execute(sock, m) {
    try {
      const mode = global.mode || 'public';

      const text = `
⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻
👁️ 𝐓𝐇𝐄_𝐏𝐀𝐈𝐍-MD IS WATCHING 👁️
⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻

💀 *STATUS* : 𝐀𝐋𝐈𝐕𝐄 & 𝐔𝐍𝐒𝐓𝐎𝐏𝐏𝐀𝐁𝐋𝐄
🩸 *MODE* : ${mode.toUpperCase()}
⚡ *UPTIME* : ${formatUptime(process.uptime())}
🧠 *ENGINE* : Baileys MD
🛡️ *PERFORMANCE* : Optimale & Invisible

👑 *OWNER* : Toujours présent, même dans l’ombre
☠️ *WARNING* : Messagerie surveillée…

> _The power of 𝐓𝐇𝐄_𝐏𝐀𝐈𝐍-MD flows through this bot_
⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻
`;

      await sock.sendMessage(
        m.chat,
        { text },
        { quoted: m }
      );

    } catch (err) {
      console.error('Alive command error:', err);
    }
  }
};

// ==================== Utils ====================
function formatUptime(seconds) {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  return [
    d ? `${d}d` : null,
    h ? `${h}h` : null,
    m ? `${m}m` : null,
    `${s}s`
  ].filter(Boolean).join(' ');
}