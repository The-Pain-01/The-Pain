import axios from "axios";
import config from "../config.js";

export default {
  name: "explain",
  async execute(sock, m, args) {
    if (!args.length) return m.reply("Explique quoi ?");

    try {
      const res = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "mistralai/mistral-7b-instruct",
          messages: [
            {
              role: "system",
              content: "Explique clairement et simplement."
            },
            { role: "user", content: args.join(" ") }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${config.OPENROUTER_API_KEY}`
          }
        }
      );

      const text = res.data.choices[0].message.content;

      m.reply(
`╔═══ 📖 𝐄𝐗𝐏𝐋𝐀𝐈𝐍 ═══╗
${text}
╚══════════════════╝`);
    } catch {
      m.reply("❌ Erreur explication.");
    }
  }
};