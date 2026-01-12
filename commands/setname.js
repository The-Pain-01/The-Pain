export default {
  name: 'setname',
  admin: true,
  async execute(sock, m, args) {
    await sock.groupUpdateSubject(m.chat, args.join(' '));
    await sock.sendMessage(m.chat, { text: '🩸 Nom du groupe gravé.' }, { quoted: m });
  }
};