export default {
  name: 'welcome',
  admin: true,
  async execute(sock, m, args) {
    global.welcome ??= {};
    global.welcome[m.chat] = args[0] === 'on';

    await sock.sendMessage(m.chat, {
      text: args[0] === 'on'
        ? '🩸 Un rituel de bienvenue sombre est activé.'
        : '❄️ Le portail d’accueil est refermé.'
    }, { quoted: m });
  },

  async participantUpdate(sock, update) {
    if (update.action === 'add' && global.welcome?.[update.id]) {
      await sock.sendMessage(update.id, {
        text: `☠️ Bienvenue dans l’abîme… ici, 𝐓𝐇𝐄_𝐏𝐀𝐈𝐍-MD observe.`
      });
    }
  }
};