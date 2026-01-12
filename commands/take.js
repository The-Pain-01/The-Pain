export default {
  name: 'take',
  description: 'Renomme un sticker en Dark Empire',
  category: 'utilitaires',
  async execute(sock, m) {
    if (!m.message.stickerMessage)
      return sock.sendMessage(m.chat, { text: '💀 Envoie un sticker pour le modifier.' }, { quoted: m });

    await sock.sendMessage(
      m.chat,
      { text: `
☠️ DARK STICKER TAKE ☠️
🕷️ Sticker modifié par le pouvoir des ténèbres
🩸 Pack : 𝐓𝐇𝐄_𝐏𝐀𝐈𝐍-MD
`, },
      { quoted: m }
    );
  },
};