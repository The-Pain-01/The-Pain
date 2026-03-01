import axios from "axios";
import config from "../config.js";

export default {
  name: "vision",
  async execute(sock, m) {
    if (!m.message?.imageMessage)
      return m.reply("Réponds à une image.");

    try {
      const buffer = await sock.downloadMediaMessage(m);
      const base64 = buffer.toString("base64");

      const res = await axios.post(
        "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large",
        base64,
        {
          headers: {
            Authorization: `Bearer ${config.HUGGINGFACE_API_KEY}`,
            "Content-Type": "application/octet-stream"
          }
        }
      );

      const caption = res.data[0]?.generated_text || "Analyse impossible.";

      m.reply(
`╔═══ 👁️ 𝐕𝐈𝐒𝐈𝐎𝐍 ═══╗
${caption}
╚══════════════════╝`);
    } catch {
      m.reply("❌ Erreur analyse image.");
    }
  }
};