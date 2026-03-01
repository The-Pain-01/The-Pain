export default {
  name: "math",
  async execute(sock, m, args) {
    if (!args.length) return m.reply("╔═══ 🧠 𝐌𝐀𝐓𝐇 ═══╗\n┃ Donne une expression.\n╚═══════════════╝");

    try {
      const exp = args.join(" ");
      const result = Function(`"use strict";return (${exp})`)();

      await m.reply(
`╔═══ 🧠 𝐌𝐀𝐓𝐇 ═══╗
┃ Expression : ${exp}
┃ Résultat : ${result}
╚═══════════════╝
> POWER BY 🩸𝐓𝐇𝐄 𝐏𝐀𝐈𝐍🩸`);
    } catch {
      m.reply("❌ Expression invalide.");
    }
  }
};