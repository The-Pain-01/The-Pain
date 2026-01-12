export default {
  name: 'admins',
  async execute(sock, m) {
    const meta = await sock.groupMetadata(m.chat);
    const admins = meta.participants.filter(p => p.admin).map(a => `• @${a.id.split('@')[0]}`).join('\n');
    await sock.sendMessage(m.chat, {
      text: `👑 ADMINS\n${admins}`,
      mentions: meta.participants.map(p => p.id)
    }, { quoted: m });
  }
};