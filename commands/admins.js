export default {

  name: "admins",

  async execute(sock, m) {


    if (!m.isGroup)
      return m.reply(
        "☠️ Cette commande fonctionne uniquement en groupe."
      );


    const meta =
      await sock.groupMetadata(
        m.chat
      );


    const admins =
      meta.participants
      .filter(
        p => p.admin
      );


    const text =
`👑 𝐀𝐃𝐌𝐈𝐍𝐒 𝐃𝐔 𝐆𝐑𝐎𝐔𝐏𝐄

${admins
.map(
p => `• @${p.id.split("@")[0]}`
)
.join("\n")}`;


    await sock.sendMessage(
      m.chat,
      {
        text,
        mentions:
        admins.map(
          p => p.id
        )
      },
      {
        quoted:m
      }
    );


  }

};