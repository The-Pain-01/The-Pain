export default {
  name: 'warn',
  admin: true,
  async execute(sock, m) {
    const user = m.mentionedJid[0];
    if (!user) return;

    global.warns ??= {};
    global.warns[user] = (global.warns[user] || 0) + 1;

    await sock.sendMessage(m.chat, {
      text: `⚠️ Avertissement ${global.warns[user]} — l’ombre se rapproche.`
    }, { quoted: m });
  }
};