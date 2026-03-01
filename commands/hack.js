export default {
  name: "hack",
  async execute(sock, m, args) {
    const target = args[0] || "CIBLE_INCONNUE";

    const text =
`╔═══ 💻 𝐇𝐀𝐂𝐊 𝐌𝐎𝐃𝐄 ═══╗
┃ Connexion à ${target}...
┃ Injection du virus...
┃ Extraction des données...
┃ ☠️ Système compromis.
╚══════════════════════╝`;

    m.reply(text);
  }
};