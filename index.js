// ================== CORE ==================
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import pino from 'pino';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

// ================== CONFIG & GLOBALS ==================
import config from './config.js';

// ================== ASSETS & UTILS ==================
import { connectionMessage, getBotImage } from './system/botAssets.js';
import { loadSessionFromMega } from './system/megaSession.js';

// ================== HANDLER ==================
import handleCommand, {
  loadCommands,
  handleParticipantUpdate
} from './handler.js';

// ================== BAILEYS ==================
import makeWASocket, {
  Browsers,
  DisconnectReason,
  fetchLatestBaileysVersion,
  jidDecode,
  useMultiFileAuthState
} from '@whiskeysockets/baileys';

// ================== PATH ==================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ================== CRYPTO FIX ==================
if (!globalThis.crypto?.subtle) {
  globalThis.crypto = crypto.webcrypto;
}

// ================== GLOBAL CONFIG ==================
global.owner ??= [config.OWNER_NUMBER];
global.SESSION_ID ??= config.SESSION_ID;

global.botModes ??= {
  typing: false,
  recording: false,
  autoreact: { enabled: false },
  autoread: { enabled: false }
};

global.autoStatus ??= false;
global.botStartTime = Date.now();

// ================== SESSION ==================
const sessionDir = path.join(__dirname, 'session');
const credsPath = path.join(sessionDir, 'creds.json');

if (!fs.existsSync(sessionDir)) {
  fs.mkdirSync(sessionDir, { recursive: true });
}

// ================== START BOT ==================
async function startBot() {
  try {
    console.log(chalk.yellow("🚀 Démarrage du bot..."));

    await loadSessionFromMega(credsPath);

    const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
      auth: state,
      version,
      logger: pino({ level: 'silent' }),
      browser: Browsers.macOS('Safari'),
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

    // ================== LOAD COMMANDS (DEBUG) ==================
    console.log(chalk.cyan("📂 Chargement des commandes..."));

    try {
      await loadCommands();
      console.log(chalk.green("✅ Toutes les commandes ont été chargées"));
    } catch (err) {
      console.error(chalk.red("💥 ERREUR LORS DU CHARGEMENT DES COMMANDES"));
      console.error(err.stack); // affiche fichier + ligne exacte
      process.exit(1);
    }

    // ================== CONNECTION ==================
    sock.ev.on('connection.update', async ({ connection, lastDisconnect }) => {
      if (connection === 'open') {
        console.log(chalk.green('✅ BOT CONNECTÉ'));

        try {
          const jid = sock.user.id.split(':')[0] + '@s.whatsapp.net';
          await sock.sendMessage(jid, {
            image: { url: getBotImage() },
            caption: connectionMessage()
          });
        } catch (err) {
          console.error("Erreur message connexion:", err);
        }
      }

      if (connection === 'close') {
        const reason = lastDisconnect?.error?.output?.statusCode;
        console.log(chalk.red('❌ Déconnecté :'), reason);

        if (reason !== DisconnectReason.loggedOut) {
          setTimeout(startBot, 5000);
        } else {
          console.log(chalk.red('🚫 Session expirée – supprime session/creds.json'));
        }
      }
    });

    // ================== MESSAGES ==================
    sock.ev.on('messages.upsert', async ({ messages }) => {
      if (!messages?.length) return;

      for (const msg of messages) {
        if (!msg?.message) continue;

        try {
          await handleCommand(sock, msg);
        } catch (err) {
          console.error("❌ Message handler error:");
          console.error(err.stack);
        }
      }
    });

    // ================== GROUP EVENTS ==================
    sock.ev.on('group-participants.update', async update => {
      try {
        await handleParticipantUpdate(sock, update);
      } catch (err) {
        console.error("❌ Group update error:");
        console.error(err.stack);
      }
    });

    sock.ev.on('creds.update', saveCreds);

    return sock;

  } catch (err) {
    console.error("💀 ERREUR FATALE AU DÉMARRAGE");
    console.error(err.stack); // affiche la stack complète
    process.exit(1);
  }
}

// ================== RUN ==================
startBot();

// ================== GLOBAL ERRORS ==================
process.on('unhandledRejection', err => {
  console.error("⚠️ UnhandledRejection:");
  console.error(err.stack);
});

process.on('uncaughtException', err => {
  console.error("⚠️ UncaughtException:");
  console.error(err.stack);
});