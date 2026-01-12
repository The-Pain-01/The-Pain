// ==================== commands/ping.js ====================
export default {
  name: 'ping',
  aliases: ['pong', 'latency'],
  description: 'Répond PONG avec la latence en ms',
  category: 'info',

  async execute(sock, m) {
    try {
      const start = Date.now();

      // Message temporaire pour mesurer la latence
      const temp = await sock.sendMessage(
        m.chat,
        { text: '💀 Calcul du ping...' },
        { quoted: m }
      );

      const latency = Date.now() - start;

      const text = `
☠️ 𝐓𝐇𝐄_𝐏𝐀𝐈𝐍-MD PONG ☠️
⚡ LATENCE : ${latency} ms
🩸 MODE   : ${global.mode?.toUpperCase() || 'PUBLIC'}
💀 Le bot est actif et observe dans l’ombre...
`;

      await sock.sendMessage(
        m.chat,
        { text },
        { quoted: m }
      );

      // Supprime le message temporaire pour garder le chat propre
      await sock.deleteMessage(m.chat, { id: temp.key.id, remoteJid: m.chat });
    } catch (err) {
      console.error('Ping command error:', err);
      await sock.sendMessage(
        m.chat,
        { text: '💀 Une erreur est survenue.' },
        { quoted: m }
      );
    }
  },
};