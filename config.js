import dotenv from "dotenv";

dotenv.config();

const config = {

  BOT_NAME:
    process.env.BOT_NAME ||
    "𝐓𝐇𝐄 𝐏𝐀𝐈𝐍 𝐌𝐃",

  PREFIX:
    process.env.PREFIX ||
    ".",

  MODE:
    process.env.MODE ||
    "private",

  VERSION:
    "1.0.0",

  OWNER_NAME:
    process.env.OWNER_NAME ||
    "—͟͟͞͞𝐓𝐇𝐄 ➪ 𝐏𝐀𝐈𝐍 ᭄",

  OWNERS:
    [
      process.env.OWNER_NUMBER
    ].filter(Boolean),

  CHANNEL:
    process.env.CHANNEL_LINK ||
    "https://whatsapp.com/channel/0029Vb7FTvDICVfgeK27ul2S",

  AUTO_READ:
    process.env.AUTO_READ === "true",

  AUTO_TYPING:
    process.env.AUTO_TYPING === "true",

  AUTO_RECORDING:
    process.env.AUTO_RECORDING === "true",

  AUTO_STATUS_VIEW:
    process.env.AUTO_STATUS_VIEW === "true",

  PAIN_THEME:
    process.env.PAIN_THEME !== "false",

  DARK_MODE:
    process.env.DARK_MODE !== "false",

  OPENROUTER_API_KEY:
    process.env.OPENROUTER_API_KEY || "",

  HUGGINGFACE_API_KEY:
    process.env.HUGGINGFACE_API_KEY || "",

  GEMINI_API_KEY:
    process.env.GEMINI_API_KEY || "",

  OPENAI_API_KEY:
    process.env.OPENAI_API_KEY || "",

  CLAUDE_API_KEY:
    process.env.CLAUDE_API_KEY || "",

  MENU_IMAGE:
    process.env.MENU_IMAGE ||
    "https://files.catbox.moe/10v9f5.jpg",

  SUPPORT_IMAGE:
    process.env.SUPPORT_IMAGE ||
    "https://files.catbox.moe/dr55vz.png",

  BOTINFO_IMAGE:
    process.env.BOTINFO_IMAGE ||
    "https://files.catbox.moe/r3s1u6.png",

  OWNER_IMAGE:
    process.env.OWNER_IMAGE ||
    "https://files.catbox.moe/kf8r3t.png",

  CONNECT_IMAGE:
    process.env.CONNECT_IMAGE ||
    "https://files.catbox.moe/v72ssh.png",

  MENU_AUDIO:
    process.env.MENU_AUDIO ||
    "https://files.catbox.moe/e4zfh9.mp3",

  CONNECT_AUDIO:
    process.env.CONNECT_AUDIO ||
    "https://files.catbox.moe/239szf.mp3"
};

export default config;