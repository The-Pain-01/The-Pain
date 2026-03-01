export default {
  name: "mood",
  async execute(sock, m, args) {
    const text = args.join(" ").toLowerCase();
    let mood = "Neutre 🤖";

    if (text.includes("triste") || text.includes("sad")) mood = "Tristesse 😢";
    if (text.includes("colère") || text.includes("angry")) mood = "Colère 😡";
    if (text.includes("heureux") || text.includes("happy")) mood = "Joie 😎";

    m.reply(
`╔═══ 🧠 𝐌𝐎𝐎𝐃 ═══╗
┃ Émotion détectée : ${mood}
╚═══════════════╝`);
  }
};