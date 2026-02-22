// ==================== index.js ====================
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import pino from "pino";
import crypto from "crypto";

import config from "./config.js";
import { connectionMessage, getBotImage } from "./system/botAssets.js";
import { loadSessionFromMega } from "./system/megaSession.js";

// ✅ IMPORT CORRECT DU HANDLER
import handleCommand, {
  loadCommands,
  handleParticipantUpdate
} from "./handler.js";

import makeWASocket, {
  Browsers,
  DisconnectReason,
  fetchLatestBaileysVersion,
  jidDecode,
  useMultiFileAuthState
} from "@whiskeysockets/baileys";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!globalThis.crypto?.subtle) {
  globalThis.crypto = crypto.webcrypto;
}

global.owner ??= config.OWNERS || [];
global.SESSION_ID ??= config.SESSION_ID;
global.botStartTime = Date.now();

const sessionDir = path.join(__dirname, "session");
const credsPath = path.join(sessionDir, "creds.json");

if (!fs.existsSync(sessionDir)) {
  fs.mkdirSync(sessionDir, { recursive: true });
}

async function startBot() {
  try {
    console.log(chalk.yellow("🚀 Démarrage du bot..."));

    await loadSessionFromMega(credsPath);

    const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
      auth: state,
      version,
      logger: pino({ level: "silent" }),
      browser: Browsers.macOS("Safari"),
      printQRInTerminal: false
    });

    sock.decodeJid = jid => {
      if (!jid) return jid;
      if (/:\d+@/gi.test(jid)) {
        const d = jidDecode(jid) || {};
        return d.user && d.server ? `${d.user}@${d.server}` : jid;
      }
      return jid;
    };

    // ✅ CHARGEMENT DES COMMANDES
    await loadCommands();
    console.log(chalk.green("✅ Commandes chargées avec succès"));

    // ================= CONNECTION =================
    sock.ev.on("connection.update", async ({ connection, lastDisconnect }) => {
      if (connection === "open") {
        console.log(chalk.green("✅ BOT CONNECTÉ"));
      }

      if (connection === "close") {
        const reason = lastDisconnect?.error?.output?.statusCode;
        console.log(chalk.red("❌ Déconnecté :"), reason);

        if (reason !== DisconnectReason.loggedOut) {
          setTimeout(startBot, 5000);
        }
      }
    });

    // ================= MESSAGE HANDLER =================
    sock.ev.on("messages.upsert", async ({ messages }) => {
      if (!messages?.length) return;

      for (const msg of messages) {
        if (!msg?.message) continue;

        try {
          await handleCommand(sock, msg);
        } catch (err) {
          console.error("❌ Message handler error:");
          console.error(err);
        }
      }
    });

    // ================= GROUP UPDATE =================
    sock.ev.on("group-participants.update", async update => {
      try {
        await handleParticipantUpdate(sock, update);
      } catch (err) {
        console.error("❌ Group update error:");
        console.error(err);
      }
    });

    // ================= SAVE CREDS =================
    sock.ev.on("creds.update", saveCreds);

  } catch (err) {
    console.error("💀 ERREUR FATALE AU DÉMARRAGE");
    console.error(err);
    process.exit(1);
  }
}

startBot();