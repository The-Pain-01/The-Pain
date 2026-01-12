export default {
  name: 'hidetag',
  admin: true,
  async execute(sock, m, args) {
    const meta = await sock.groupMetadata(m.chat);
    await sock.sendMessage(m.chat, {
      text: args.join(' ') || '🩸 Tous sont marqués.',
      mentions: meta.participants.map(p => p.id)
    });
  }
};