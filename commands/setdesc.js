export default {
  name: 'setdesc',
  admin: true,
  async execute(sock, m, args) {
    await sock.groupUpdateDescription(m.chat, args.join(' '));
    await sock.sendMessage(m.chat, { text: '🩸 Description scellée.' }, { quoted: m });
  }
};