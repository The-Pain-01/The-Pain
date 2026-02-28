import makeWASocket, {
  fetchLatestBaileysVersion,
  Browsers,
  DisconnectReason
} from "@whiskeysockets/baileys";

import pino from "pino";
import config from "./config.js";
import { loadSessionFromMega } from "./system/loadSession.js";
import { handleCommand, loadCommands } from "./handler.js";

console.log("🚀 Démarrage du bot...");

async function startBot() {
  try {

    // 🔥 Charger la session ID
    const { state, saveCreds } = await loadSessionFromMega();

    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
      version,
      logger: pino({ level: "silent" }),
      printQRInTerminal: false,
      browser: Browsers.windows("Chrome"), // ⚠️ IMPORTANT
      auth: state,
      markOnlineOnConnect: true,
      syncFullHistory: false
    });

    // 💾 Sauvegarde auto des creds
    sock.ev.on("creds.update", saveCreds);

    // 📡 Connexion
    sock.ev.on("connection.update", async (update) => {
      const { connection, lastDisconnect } = update;

      if (connection === "open") {
        console.log("✅ BOT CONNECTÉ AVEC SUCCÈS");
      }

      if (connection === "close") {
        const statusCode = lastDisconnect?.error?.output?.statusCode;

        if (statusCode === DisconnectReason.loggedOut || statusCode === 401) {
          console.log("❌ Session invalide (401)");
        } else {
          console.log("🔄 Reconnexion...");
          startBot();
        }
      }
    });

    // 📩 Messages entrants
    sock.ev.on("messages.upsert", async ({ messages }) => {
      try {
        const m = messages[0];
        if (!m.message) return;
        if (m.key && m.key.remoteJid === "status@broadcast") return;

        await handleCommand(sock, m);

      } catch (err) {
        console.log("❌ Erreur message:", err.message);
      }
    });

    // 📦 Chargement commandes (affichage propre)
    const totalCommands = await loadCommands();
    console.log(`📦 ${totalCommands} commandes chargées avec succès`);

  } catch (err) {
    console.log("❌ Erreur critique:", err.message);
    console.log("🔄 Redémarrage automatique...");
    setTimeout(startBot, 5000);
  }
}

// 🔥 Anti crash global
process.on("uncaughtException", (err) => {
  console.log("❌ Uncaught Exception:", err.message);
});

process.on("unhandledRejection", (err) => {
  console.log("❌ Unhandled Rejection:", err);
});

startBot();