export default {
  name: 'mode',
  ownerOnly: true,
  async execute(sock, m, args) {
    const mode = args[0]?.toLowerCase();

    if (!['public', 'private', 'self'].includes(mode))
      return sock.sendMessage(
        m.chat,
        { text: '❌ Usage : .mode public | private | self' },
        { quoted: m }
      );

    global.mode = mode;

    await sock.sendMessage(
      m.chat,
      {
        text: `🩸 MODE DU BOT MIS À JOUR 🩸\n\n⚙️ Mode actuel : *${mode.toUpperCase()}*`
      },
      { quoted: m }
    );
  }
};