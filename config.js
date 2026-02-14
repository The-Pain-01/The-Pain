// ==================== config.js ====================
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ================== ESM __dirname ==================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ================== CONFIGURATION PAR DÉFAUT ==================
const defaultConfig = {
  SESSION_ID: "",
  OWNERS: ["27727500078"], // 🔥 Le déployeur met son numéro ici (sans +)
  PREFIX: ".",
  TIMEZONE: "Africa/Kinshasa",
  VERSION: "2.0.0",

  MODE: "public",
  autoRead: false,
  restrict: false,
  blockInbox: false,

  LINKS: {
    group: "",
    channel: "",
    telegram: ""
  }
};

// ================== DOSSIER DATA ==================
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const configPath = path.join(dataDir, "config.json");

// ================== CRÉATION SI INEXISTANT ==================
if (!fs.existsSync(configPath)) {
  fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
  console.log("✅ config.json créé");
}

let userConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));

// ================== GLOBALS ==================
global.owner = userConfig.OWNERS || [];
global.mode = userConfig.MODE || "public";
global.blockInbox = userConfig.blockInbox || false;
global.autoRead = userConfig.autoRead || false;

// ================== SAVE ==================
export function saveConfig(update = {}) {
  userConfig = { ...userConfig, ...update };
  fs.writeFileSync(configPath, JSON.stringify(userConfig, null, 2));

  if (update.MODE) global.mode = update.MODE;
  if (update.OWNERS) global.owner = update.OWNERS;
  if (typeof update.blockInbox !== "undefined")
    global.blockInbox = update.blockInbox;
  if (typeof update.autoRead !== "undefined")
    global.autoRead = update.autoRead;

  console.log("✅ Configuration mise à jour");
}

export default userConfig;