import axios from "axios";
import FormData from "form-data";

export default {
  name: "url",

  async execute(sock, m) {
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    if (!quoted) {
      return sock.sendMessage(m.chat, {
        text: "☠️ Réponds à une image, vidéo ou audio."
      });
    }

    const type = Object.keys(quoted)[0];

    if (!["imageMessage", "videoMessage", "audioMessage"].includes(type)) {
      return sock.sendMessage(m.chat, {
        text: "👁️ Seuls image, vidéo ou audio sont acceptés."
      });
    }

    try {
      // Télécharger média
      const buffer = await sock.downloadMediaMessage({
        message: quoted
      });

      // Déterminer extension
      let ext = "bin";
      if (type === "imageMessage") ext = "jpg";
      if (type === "videoMessage") ext = "mp4";
      if (type === "audioMessage") ext = "mp3";

      const form = new FormData();
      form.append("reqtype", "fileupload");
      form.append("fileToUpload", buffer, `file.${ext}`);

      const response = await axios.post(
        "https://catbox.moe/user/api.php",
        form,
        { headers: form.getHeaders() }
      );

      const url = response.data.trim(); // format https://files.catbox.moe/xxxxx.ext

      await sock.sendMessage(m.chat, {
        text: `
╔═══〔 🌐 PORTAIL CATBOX 🌐 〕═══╗

🩸 Fichier libéré :

${url}

☠️ Le lien est public. Utilise-le avec prudence.
╚════════════════════╝
`
      });

    } catch (err) {
      console.error(err);
      await sock.sendMessage(m.chat, {
        text: "💀 Échec lors de l’upload vers Catbox."
      });
    }
  }
};