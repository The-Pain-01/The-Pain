export default {
  name: "kickall",
  description: "Expulse tous les membres (sauf le bot et l'owner)",
  admin: true,
  group: true,

  async execute(sock, m, args) {
    if (!m.isGroup) {
      return m.reply("❌ Cette commande est réservée aux groupes.");
    }

    if (!m.isAdmin) {
      return m.reply("❌ Seuls les admins peuvent utiliser cette commande.");
    }

    try {
      const metadata = await sock.groupMetadata(m.chat);
      const participants = metadata.participants;

      const botNumber = sock.user.id.split(":")[0] + "@s.whatsapp.net";
      const ownerNumber = global.owner[0] + "@s.whatsapp.net";

      const toRemove = participants
        .map(p => p.id)
        .filter(id =>
          id !== botNumber &&
          id !== ownerNumber
        );

      if (!toRemove.length) {
        return m.reply("⚠️ Aucun membre à expulser.");
      }

      await sock.groupParticipantsUpdate(
        m.chat,
        toRemove,
        "remove"
      );

      await sock.sendMessage(m.chat, {
        text: "💀 Tous les membres ont été expulsés."
      });

    } catch (err) {
      console.error(err);
      m.reply("❌ Erreur lors de l’expulsion.");
    }
  }
};