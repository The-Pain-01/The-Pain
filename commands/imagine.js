import axios from "axios";
import config from "../config.js";

export default {
  name: "imagine",
  async execute(sock, m, args) {
    if (!args.length) return m.reply("Décris l'image.");

    try {
      const res = await axios.post(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
        { inputs: args.join(" ") },
        {
          headers: {
            Authorization: `Bearer ${config.HUGGINGFACE_API_KEY}`
          },
          responseType: "arraybuffer"
        }
      );

      await sock.sendMessage(m.chat, {
        image: Buffer.from(res.data),
        caption: "🩸 𝐓𝐇𝐄 𝐏𝐀𝐈𝐍 𝐂𝐑𝐄𝐀𝐓𝐄𝐃 𝐓𝐇𝐈𝐒"
      });
    } catch {
      m.reply("❌ Erreur génération image.");
    }
  }
};