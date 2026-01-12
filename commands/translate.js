import translate from '@vitalets/google-translate-api'; // Exemple

export default {
  name: 'translate',
  description: 'Traduit un texte dans une autre langue',
  category: 'utilitaires',
  async execute(sock, m, args) {
    if (!args[0]) return sock.sendMessage(m.chat, { text: '💀 Texte manquant pour traduction.' }, { quoted: m });

    const text = args.join(' ');
    try {
      const res = await translate(text, { to: 'fr' }); // Traduction vers le français
      await sock.sendMessage(
        m.chat,
        { text: `
☠️ DARK TRANSLATE ☠️
🕷️ Texte original : ${text}
💀 Traduction : ${res.text}
` },
        { quoted: m }
      );
    } catch (err) {
      await sock.sendMessage(m.chat, { text: '☠️ Erreur lors de la traduction.' }, { quoted: m });
    }
  },
};