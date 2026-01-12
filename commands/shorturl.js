import fetch from 'node-fetch';

export default {
  name: 'shorturl',
  description: 'Raccourcit un lien',
  category: 'utilitaires',
  async execute(sock, m, args) {
    if (!args[0]) return sock.sendMessage(m.chat, { text: '💀 URL manquante à raccourcir.' }, { quoted: m });
    const url = args[0];

    try {
      const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (data.ok) {
        await sock.sendMessage(
          m.chat,
          { text: `
☠️ DARK SHORTURL ☠️
🕷️ URL originale : ${url}
💀 URL raccourcie : ${data.result.full_short_link}
` },
          { quoted: m }
        );
      } else {
        throw new Error('Erreur API');
      }
    } catch (err) {
      await sock.sendMessage(m.chat, { text: '☠️ Impossible de raccourcir ce lien.' }, { quoted: m });
    }
  },
};