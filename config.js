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

  OWNERS: ["27727500078"],

  PREFIX: ".",
  TIMEZONE: "Africa/Kinshasa",
  VERSION: "3.0.0",

  MODE: "public",
  autoRead: false,
  restrict: false,
  blockInbox: false,

  // 🔥 IA APIs (gratuites)
  AI_API: "https://api.safone.dev/ai/chat",
  GPT_API: "https://api.safone.dev/ai/chat",

  BOT_NAME: "🩸𝐓𝐇𝐄 𝐏𝐀𝐈𝐍🩸",
  FOOTER: "> POWER BY 🩸𝐓𝐇𝐄 𝐏𝐀𝐈𝐍🩸",

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
global.botname = userConfig.BOT_NAME || "THE PAIN";
global.footer = userConfig.FOOTER || "";

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

  if (update.BOT_NAME) global.botname = update.BOT_NAME;
  if (update.FOOTER) global.footer = update.FOOTER;

  console.log("✅ Configuration mise à jour");
}

export default userConfig;