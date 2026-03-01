import config from "../config.js";

export default {
  name: "gpt",

  async execute(sock, m, args) {
    if (!args.length) {
      return m.reply("🩸 Interroge l'intelligence suprême...");
    }

    const prompt = args.join(" ");

    try {
      const res = await fetch(`${config.GPT_API}?message=${encodeURIComponent(prompt)}&model=gpt-4`);
      const data = await res.json();

      if (!data?.response) {
        return m.reply("❌ L'abîme ne répond pas...");
      }

      await sock.sendMessage(m.chat, {
        text:
`╔════════════════════╗
   🩸 𝐓𝐇𝐄 𝐏𝐀𝐈𝐍 – GPT
╚════════════════════╝

${data.response}

━━━━━━━━━━━━━━━━━━━━
${config.FOOTER}`
      }, { quoted: m });

    } catch {
      m.reply("❌ Connexion à l'intelligence suprême impossible...");
    }
  }
};