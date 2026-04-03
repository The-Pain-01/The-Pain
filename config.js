// ==================== config.js ====================
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ================== ESM __dirname ==================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ================== CONFIG PAR DÉFAUT ==================
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

  // APIs
  AI_API: "https://api.safone.dev/ai/chat",
  GPT_API: "https://api.safone.dev/ai/chat",
  OPENROUTER_API_KEY: "",
  HUGGINGFACE_API_KEY: "",

  BOT_NAME: "🩸𝐓𝐇𝐄 𝐏𝐀𝐈𝐍🩸",
  FOOTER: "> POWER BY 🩸𝐓𝐇𝐄 𝐏𝐀𝐈𝐍🩸",

  LINKS: {
    group: "",
    channel: "https://whatsapp.com/channel/0029Vb7FTvDICVfgeK27ul2S",
    telegram: ""
  }
};

// ================== DOSSIER DATA ==================
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const configPath = path.join(dataDir, "config.json");

// ================== CRÉATION CONFIG ==================
if (!fs.existsSync(configPath)) {
  fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
  console.log("✅ config.json créé");
}

// ================== LECTURE ==================
let userConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));

// ================== 🔥 FIX SESSION pain~ ==================
if (userConfig.SESSION_ID && userConfig.SESSION_ID.startsWith("pain~")) {
  try {
    const raw = userConfig.SESSION_ID.replace("pain~", "");
    const [id, key] = raw.split("#");

    if (id && key) {
      const fixed = `https://mega.nz/file/${id}#${key}`;
      userConfig.SESSION_ID = fixed;

      console.log("✅ SESSION pain~ convertie en URL valide");
    } else {
      console.log("❌ SESSION pain~ invalide");
    }
  } catch (e) {
    console.log("❌ ERREUR conversion session:", e);
  }
}

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

  // 🔥 Re-apply fix si nouvelle session
  if (update.SESSION_ID && update.SESSION_ID.startsWith("pain~")) {
    const raw = update.SESSION_ID.replace("pain~", "");
    const [id, key] = raw.split("#");

    if (id && key) {
      userConfig.SESSION_ID = `https://mega.nz/file/${id}#${key}`;
    }
  }

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

// ================== EXPORT ==================
export default userConfig;