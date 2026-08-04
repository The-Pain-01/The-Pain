import config from "../config.js";

export default {

  name: "alive",

  async execute(sock, m) {


    const text = `
⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻

☠️ ${config.BOT_NAME} ☠️

⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻

🤖 Status : ONLINE

⚙️ Mode : ${config.MODE.toUpperCase()}

⏳ Uptime : ${Math.floor(process.uptime())}s


🩸 Le système est actif.

🧊 Accès contrôlé selon le mode.


> The power of 𝐓𝐇𝐄_𝐏𝐀𝐈𝐍-MD flows through this bot

⸻⸻⸻⸻⸻⸻⸻⸻
`;


    await sock.sendMessage(
      m.chat,
      {
        text,

        contextInfo: {

          isForwarded:true,

          forwardingScore:999,

          forwardedNewsletterMessageInfo:{

            newsletterJid:
            "120363422649925479@newsletter",

            newsletterName:
            "⏤͟͟͞𝐓𝐇𝐄 亗 𝐏𝐀𝐈𝐍 亗 𝐓𝐄𝐂𝐇᭄",

            serverMessageId:1

          }

        }

      },
      {
        quoted:m
      }
    );


  }

};