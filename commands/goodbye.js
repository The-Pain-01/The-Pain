export default {
  name: 'goodbye',
  admin: true,
  async execute(sock, m, args) {
    global.goodbye ??= {};
    global.goodbye[m.chat] = args[0] === 'on';

    await sock.sendMessage(m.chat, {
      text: args[0] === 'on'
        ? '😈 Les adieux humiliants sont activés.'
        : '🧊 Le silence accompagne désormais les fuyards.'
    }, { quoted: m });
  },

  async participantUpdate(sock, update) {
    if (update.action === 'remove' && global.goodbye?.[update.id]) {
      await sock.sendMessage(update.id, {
        text: `😂 Encore un faible effacé de la mémoire du groupe.`
      });
    }
  }
};