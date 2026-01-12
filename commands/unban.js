export default {
  name: 'unban',
  ownerOnly: true,
  async execute(sock, m) {
    const user = m.mentionedJid[0];
    if (!user) return;
    global.bannedUsers.delete(user);
    await sock.sendMessage(m.chat, {
      text: '🩸 La condamnation est levée.'
    }, { quoted: m });
  }
};