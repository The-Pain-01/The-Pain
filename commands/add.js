export default {

  name: "add",

  admin: true,

  async execute(sock, m, args) {

    if (!m.isGroup)
      return m.reply("☠️ Cette commande est disponible uniquement en groupe.");

    const number =
      args[0]?.replace(/\D/g, "");


    if (!number)
      return m.reply("📌 Utilisation : .add 243XXXXXXXXX");


    try {

      await sock.groupParticipantsUpdate(
        m.chat,
        [
          `${number}@s.whatsapp.net`
        ],
        "add"
      );


      await m.reply(
        "🩸 Une nouvelle présence rejoint le groupe."
      );


    } catch (err) {

      await m.reply(
        "❌ Impossible d'ajouter ce contact."
      );

    }

  }

};