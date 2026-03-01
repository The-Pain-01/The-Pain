import axios from "axios";
import config from "../config.js";

export default {
  name: "brain",
  async execute(sock, m, args) {
    if (!args.length) return m.reply("Pose une question.");

    const question = args.join(" ");

    try {
      const res = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "mistralai/mistral-7b-instruct",
          messages: [
            {
              role: "system",
              content: "Tu es THE PAIN, une IA sombre, glacial, intelligente et concise."
            },
            {
              role: "user",
              content: question
            }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${config.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      const reply = res.data.choices[0].message.content;

      m.reply(
`╔═══ 🧠 𝐁𝐑𝐀𝐈𝐍 ═══╗
${reply}
╚══════════════════╝`);
    } catch (err) {
      m.reply("❌ Erreur IA.");
    }
  }
};