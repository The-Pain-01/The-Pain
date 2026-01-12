export default {
  name: 'ban',
  ownerOnly: true,
  async execute(sock, m) {
    const user = m.mentionedJid[0];
    if (!user) return;
    global.bannedUsers.add(user);
    await sock.sendMessage(m.chat, {
      text: '☠️ L’utilisateur est effacé.'
    }, { quoted: m });
  }
};