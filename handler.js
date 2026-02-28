// ==================== handler.js ====================
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import config from "./config.js";

const commands = {};
const SETTINGS_FILE = "./data/settings.json";

// ================= INIT DOSSIERS =================
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
  let count = 0;

  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);

    if (file.endsWith(".js")) {
      try {
        const mod = await import(pathToFileURL(full));
        const cmd = mod.default;

        if (cmd?.name) {
          commands[cmd.name.toLowerCase()] = cmd;
          count++;
        }
      } catch (err) {
        console.error(`❌ Erreur dans ${file}`);
        console.error(err);
        process.exit(1);
      }
    }
  }

  console.log(`✅ ${count} commandes chargées avec succès`);
}

// ================= HANDLE COMMAND =================
async function handleCommand(sock, mRaw) {