import { saveConfig } from "../config.js";

export default {
  name: "mode",
  ownerOnly: true,

  async execute(sock, m, args) {
    const mode = args[0]?.toLowerCase();

    if (!mode || !["public", "private", "self"].includes(mode)) {
      return sock.sendMessage(
        m.chat,
        {
          text: `
🩸 𝐓𝐇𝐄_𝐏𝐀𝐈𝐍-MD 🩸

Utilisation correcte :
.mode public
.mode private
.mode self

🔓 public  → Tout le monde
🔐 private → Utilisateurs autorisés
👑 self    → Owner uniquement
`
        },
        { quoted: m }
      );
    }

    saveConfig({ MODE: mode });

    await sock.sendMessage(
      m.chat,
      {
        text: `
☠️ MODE DU BOT MODIFIÉ ☠️

🧠 Nouveau mode : *${mode.toUpperCase()}*

${mode === "public" ? "🔓 Le chaos est libre…" : ""}
${mode === "private" ? "🔐 L’accès est restreint…" : ""}
${mode === "self" ? "👑 Le pouvoir est absolu…" : ""}
`
      },
      { quoted: m }
    );
  }
};