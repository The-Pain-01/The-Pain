import axios from "axios";

export default {
  name: "lyrics",
  async execute(sock, m, args) {
    if (!args.length) return m.reply("Donne un titre.");

    try {
      const query = args.join(" ");
      const res = await axios.get(`https://api.lyrics.ovh/v1/${query.split(" ")[0]}/${query.split(" ").slice(1).join(" ")}`);
      
      const lyrics = res.data.lyrics.slice(0, 1500);

      m.reply(
`╔═══ 🎵 𝐋𝐘𝐑𝐈𝐂𝐒 ═══╗
${lyrics}
╚════════════════════╝`);
    } catch {
      m.reply("❌ Paroles introuvables.");
    }
  }
};