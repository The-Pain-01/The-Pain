// ==================== handler.js ====================
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import config from "./config.js";

const commands = {};
const SETTINGS_FILE = "./data/settings.json";

// ================= REACTIONS SOMBRES =================
const darkReactions = [
  "🩸","☠️","👹","👺","🧠","🫀","🌹","🔥",
  "🕸️","🕷️","❄️","🥷🏽","🤖","🌟","👨🏽‍💻"
];

function randomReaction() {
  return darkReactions[Math.floor(Math.random() * darkReactions.length)];
}

// ================= INIT DOSSIERS =================
if (!fs.existsSync("./data")) {
  fs.mkdirSync("./data", { recursive: true });
}

if (!fs.existsSync(SETTINGS_FILE)) {
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify({}, null, 2));
}

let saved = {};
try {
  saved = JSON.parse(fs.readFileSync(SETTINGS_FILE));
} catch {
  saved = {};
}

global.mutedGroups = new Set(saved.mutedGroups || []);
global.antilinkGroups = new Set(saved.antilinkGroups || []);

function saveSettings() {
  try {
    fs.writeFileSync(
      SETTINGS_FILE,
      JSON.stringify(
        {
          mutedGroups: [...global.mutedGroups],
          antilinkGroups: [...global.antilinkGroups]
        },
        null,
        2
      )
    );
  } catch (err) {
    console.log("❌ Erreur sauvegarde settings:", err.message);
  }
}

// ================= LOAD COMMANDS =================
export async function loadCommands(dir = "./commands") {
  let count = 0;

  try {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      if (!file.endsWith(".js")) continue;

      const full = path.join(dir, file);

      try {
        const mod = await import(pathToFileURL(full));
        const cmd = mod.default;

        if (cmd?.name && typeof cmd.execute === "function") {
          commands[cmd.name.toLowerCase()] = cmd;
          count++;
        }
      } catch (err) {
        console.log(`❌ Erreur chargement ${file}:`, err.message);
      }
    }

    return count;
  } catch (err) {
    console.log("❌ Erreur lecture dossier commandes:", err.message);
    return 0;
  }
}

// ================= HANDLE COMMAND =================
export async function handleCommand(sock, mRaw) {
  try {
    if (!mRaw?.message) return;

    const from = mRaw.key?.remoteJid;
    if (!from) return;

    const isGroup = from.endsWith("@g.us");

    const body =
      mRaw.message.conversation ||
      mRaw.message.extendedTextMessage?.text ||
      mRaw.message.imageMessage?.caption ||
      mRaw.message.videoMessage?.caption ||
      "";

    if (!body.startsWith(config.PREFIX)) return;

    const args = body
      .slice(config.PREFIX.length)
      .trim()
      .split(/\s+/);

    const commandName = args.shift()?.toLowerCase();
    if (!commandName) return;

    const cmd = commands[commandName];
    if (!cmd) return;

    // 🔥 Groupe mute
    if (isGroup && global.mutedGroups.has(from)) return;

    // Wrapper message propre
    const m = {
      ...mRaw,
      chat: from,
      sender: isGroup
        ? mRaw.key.participant
        : from,
      isGroup,
      reply: (text) =>
        sock.sendMessage(from, { text }, { quoted: mRaw })
    };

    // ================= REACTION START =================
    try {
      await sock.sendMessage(from, {
        react: {
          text: randomReaction(),
          key: mRaw.key
        }
      });
    } catch {}

    // ================= EXECUTION SAFE =================
    try {
      await cmd.execute(sock, m, args);

      // ✅ Succès
      await sock.sendMessage(from, {
        react: {
          text: "✅",
          key: mRaw.key
        }
      });

    } catch (err) {
      console.log("❌ Command Error:", err.message);

      // ❌ Erreur
      try {
        await sock.sendMessage(from, {
          react: {
            text: "❌",
            key: mRaw.key
          }
        });
      } catch {}
    }

  } catch (err) {
    console.log("❌ Handler Fatal Error:", err.message);
  }
}

// ================= HANDLE GROUP UPDATE =================
export async function handleParticipantUpdate(sock, update) {
  try {
    console.log("📢 Group Update:", update.action);
  } catch (err) {
    console.log("❌ Group Update Error:", err.message);
  }
}

export default handleCommand;