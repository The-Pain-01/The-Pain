export default {
  name: "brain",
  async execute(sock, m, args) {
    if (!args.length) return m.reply("Pose une question.");

    const question = args.join(" ");

    m.reply(
`╔═══ 🧠 𝐁𝐑𝐀𝐈𝐍 ═══╗
┃ Analyse logique...
┃ Réponse :
┃ ${question} ? Cela dépend du contexte.
╚═══════════════╝`);
  }
};