export default {
  name: 'kickall',
  description: 'Expulse tous les membres non-admins',
  category: 'group',
  ownerOnly: true,
  async execute(sock, m) {
    if (!m.isGroup) return sock.sendMessage(m.chat, { text: '☠️ Cette commande fonctionne uniquement en groupe.' }, { quoted: m });

    const meta = await sock.groupMetadata(m.chat);
    const nonAdmins = meta.participants.filter(p => !p.admin).map(p => p.id);

    await sock.groupParticipantsUpdate(m.chat, nonAdmins, 'remove');

    await sock.sendMessage(
      m.chat,
      { text: `
☠️ KICK ALL DARK ☠️
🕷️ Membres expulsés : ${nonAdmins.length}
💀 Tous les membres non-admins ont été bannis des ténèbres !
`, contextInfo: { mentionedJid: nonAdmins } },
      { quoted: m }
    );
  },
};