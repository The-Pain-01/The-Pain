import axios from "axios";
import config from "../config.js";

export default {
  name: "code",
  async execute(sock, m, args) {
    if (!args.length) return m.reply("Décris le code à générer.");

    const prompt = args.join(" ");

    try {
      const res = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "mistralai/mistral-7b-instruct",
          messages: [
            {
              role: "system",
              content: "Génère uniquement du code propre, sans explication."
            },
            { role: "user", content: prompt }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${config.OPENROUTER_API_KEY}`
          }
        }
      );

      const code = res.data.choices[0].message.content;

      m.reply(
`╔═══ 👨🏽‍💻 𝐂𝐎𝐃𝐄 ═══╗
${code}
╚══════════════════╝`);
    } catch {
      m.reply("❌ Erreur génération code.");
    }
  }
};