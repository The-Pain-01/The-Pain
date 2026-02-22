// ==================== handler.js ====================
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import config from "./config.js";

const commands = {};
const SETTINGS_FILE = "./data/settings.json";

if (!fs.existsSync("./data")) {
  fs.mkdirSync("./data");
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
}

// ================= LOAD COMMANDS =================
async function loadCommands(dir = "./commands") {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);

    if (file.endsWith(".js")) {
      try {
        const mod = await import(pathToFileURL(full));
        const cmd = mod.default;

        if (cmd?.name) {
          commands[cmd.name.toLowerCase()] = cmd;
          console.log(`✅ Commande chargée : ${cmd.name}`);
        }
      } catch (err) {
        console.error(`❌ Erreur dans ${file}`);
        console.error(err);
        process.exit(1);
      }
    }
  }
}

// ================= HANDLE COMMAND =================
async function handleCommand(sock, mRaw) {
  if (!mRaw?.message) return;

  const body =
    mRaw.message.conversation ||
    mRaw.message.extendedTextMessage?.text ||
    "";

  if (!body.startsWith(config.PREFIX)) return;

  const args = body.slice(config.PREFIX.length).trim().split(/\s+/);
  const commandName = args.shift()?.toLowerCase();

  const cmd = commands[commandName];
  if (!cmd) return;

  try {
    await cmd.execute(sock, mRaw, args);
  } catch (err) {
    console.error("❌ Command Error:", err);
  }

  saveSettings();
}

export { loadCommands };
export default handleCommand;