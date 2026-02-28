import config from "../config.js";

export default {
  name: "ai",

  async execute(sock, m, args) {
    if (!args.length) {
      return m.reply("🩸 Les ombres attendent ta question...");
    }

    const prompt = args.join(" ");

    try {
      const res = await fetch(`${config.AI_API}?message=${encodeURIComponent(prompt)}`);
      const data = await res.json();

      if (!data?.response) {
        return m.reply("❌ Les ténèbres restent silencieuses...");
      }

      await sock.sendMessage(m.chat, {
        text:
`╭━━━〔 🩸 𝐓𝐇𝐄 𝐏𝐀𝐈𝐍 – IA 〕━━━╮

${data.response}

╰━━━━━━━━━━━━━━━━━━━╯
${config.FOOTER}`
      }, { quoted: m });

    } catch {
      m.reply("❌ L'énergie obscure est instable...");
    }
  }
};