export default {
  name: "purge",
  async execute(sock, m) {

    if (!m.isGroup)
      return m.reply("Commande uniquement en groupe.");

    const metadata = await sock.groupMetadata(m.chat);

    const bot = metadata.participants.find(
      p => p.id === sock.user.id
    );

    if (!bot?.admin)
      return m.reply("Je dois être admin.");

    const sender = metadata.participants.find(
      p => p.id === m.sender
    );

    if (!sender?.admin)
      return m.reply("Tu dois être admin.");

    const toRemove = metadata.participants
      .filter(p => !p.admin)
      .map(p => p.id);

    if (!toRemove.length)
      return m.reply("Aucun membre à supprimer.");

    await sock.sendMessage(m.chat, {
      text: `
☠️ PURGE INITIÉE ☠️
${toRemove.length} membres seront effacés...
`
    });

    await sock.groupParticipantsUpdate(
      m.chat,
      toRemove,
      "remove"
    );

    await sock.sendMessage(m.chat, {
      text: "💀 Purge terminée."
    });
  }
};