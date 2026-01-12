export default {
  name: 'add',
  admin: true,
  async execute(sock, m, args) {
    const number = args[0]?.replace(/\D/g, '');
    if (!number) return;
    await sock.groupParticipantsUpdate(m.chat, [`${number}@s.whatsapp.net`], 'add');
    await sock.sendMessage(m.chat, {
      text: '🩸 Une âme est invoquée.'
    }, { quoted: m });
  }
};