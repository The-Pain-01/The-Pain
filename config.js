import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

// ================== ESM ==================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ================== DEFAULT CONFIG ==================
const defaultConfig = {
  SESSION_ID: process.env.SESSION_ID || "",

  OWNERS: ["27727500078"],

  PREFIX: ".",
  TIMEZONE: "Africa/Kinshasa",
  VERSION: "3.0.0",

  MODE: "public",

  autoRead: false,
  restrict: false,
  blockInbox: false,

  OPENROUTER_API_KEY:
    process.env.OPENROUTER_API_KEY || "",

  HUGGINGFACE_API_KEY:
    process.env.HUGGINGFACE_API_KEY || "",

  BOT_NAME: "𝐓𝐇𝐄_𝐏𝐀𝐈𝐍-𝐌𝐃",

  FOOTER: "> POWER BY 𝐓𝐇𝐄 𝐏𝐀𝐈𝐍",

  DEV: "𝐓𝐇𝐄 𝐏𝐀𝐈𝐍",

  LINKS: {
    group: "",
    channel: "",
    telegram: ""
  }
};

// ================== DATA ==================
const dataDir = path.join(__dirname, "data");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const configPath = path.join(dataDir, "config.json");

// ================== CREATE ==================
if (!fs.existsSync(configPath)) {
  fs.writeFileSync(
    configPath,
    JSON.stringify(defaultConfig, null, 2)
  );

  console.log("✅ config.json créé");
}

let userConfig = JSON.parse(
  fs.readFileSync(configPath, "utf-8")
);

// ================== GLOBALS ==================
global.owner = userConfig.OWNERS || [];

global.mode = userConfig.MODE || "public";

global.blockInbox =
  userConfig.blockInbox || false;

global.autoRead =
  userConfig.autoRead || false;

global.botname =
  userConfig.BOT_NAME || "𝐓𝐇𝐄_𝐏𝐀𝐈𝐍-𝐌𝐃";

global.footer =
  userConfig.FOOTER || "";

// ================== SAVE ==================
export function saveConfig(update = {}) {
  userConfig = {
    ...userConfig,
    ...update
  };

  fs.writeFileSync(
    configPath,
    JSON.stringify(userConfig, null, 2)
  );

  if (update.MODE)
    global.mode = update.MODE;

  if (update.OWNERS)
    global.owner = update.OWNERS;

  if (
    typeof update.blockInbox !== "undefined"
  ) {
    global.blockInbox =
      update.blockInbox;
  }

  if (
    typeof update.autoRead !== "undefined"
  ) {
    global.autoRead =
      update.autoRead;
  }

  if (update.BOT_NAME) {
    global.botname =
      update.BOT_NAME;
  }

  if (update.FOOTER) {
    global.footer =
      update.FOOTER;
  }

  console.log("✅ Configuration mise à jour");
}

export default userConfig;