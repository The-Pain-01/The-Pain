import axios from "axios";
import config from "../config.js";

export default {
  name: "summon",
  async execute(sock, m, args) {
    if (!args.length) return m.reply("Invoque une entité.");

    const persona = args.join(" ");

    try {
      const res = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "mistralai/mistral-7b-instruct",
          messages: [
            {
              role: "system",
              content: `Tu es ${persona}. Tu réponds dans ce style uniquement.`
            },
            {
              role: "user",
              content: "Présente-toi."
            }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${config.OPENROUTER_API_KEY}`
          }
        }
      );

      const reply = res.data.choices[0].message.content;

      m.reply(
`╔═══ 👺 𝐒𝐔𝐌𝐌𝐎𝐍 ═══╗
${reply}
╚══════════════════╝`);
    } catch {
      m.reply("❌ Invocation échouée.");
    }
  }
};