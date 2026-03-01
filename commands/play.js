import yts from "yt-search";
import ytdl from "ytdl-core";
import fs from "fs";
import config from "../config.js";

export default {
  name: "play",

  async execute(sock, m, args) {
    if (!args.length) {
      return m.reply("🩸 Murmure le nom de la musique dans l'obscurité...");
    }

    const query = args.join(" ");

    try {
      // 🔎 Recherche YouTube
      const search = await yts(query);
      const video = search.videos[0];

      if (!video) {
        return m.reply("❌ Aucune âme sonore trouvée...");
      }

      if (video.seconds > 600) {
        return m.reply("❌ La musique dépasse 10 minutes... Les ténèbres refusent.");
      }

      const url = video.url;
      const filePath = `./${video.videoId}.mp3`;

      // 🎧 Téléchargement audio uniquement (anti blocage)
      const stream = ytdl(url, {
        filter: "audioonly",
        quality: "highestaudio",
        requestOptions: {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
          }
        }
      });

      const writeStream = fs.createWriteStream(filePath);
      stream.pipe(writeStream);

      writeStream.on("finish", async () => {

        // 🖼 Envoie image album
        await sock.sendMessage(m.chat, {
          image: { url: video.thumbnail },
          caption:
`╔════════════════════╗
   🩸 𝐓𝐇𝐄 𝐏𝐀𝐈𝐍 – MUSIC
╚════════════════════╝

🎵 ${video.title}
👁 ${video.views} vues
⏳ ${video.timestamp}

━━━━━━━━━━━━━━━━━━━━
${config.FOOTER}`
        }, { quoted: m });

        // 🎧 Envoie audio
        await sock.sendMessage(m.chat, {
          audio: fs.readFileSync(filePath),
          mimetype: "audio/mpeg",
          ptt: false
        }, { quoted: m });

        fs.unlinkSync(filePath);
      });

    } catch (err) {
      console.log(err);
      m.reply("❌ Les ombres ont bloqué le flux sonore...");
    }
  }
};