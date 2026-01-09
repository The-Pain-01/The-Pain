import fs from 'fs';
import path from 'path';

// Default bot image
let botImagePath = 'https://files.catbox.moe/10v9f5.jpg';

// Official bot name
export const BOT_NAME = '𝐓𝐇𝐄_𝐏𝐀𝐈𝐍-MD ';

// Bot slogan
export const BOT_SLOGAN = '> MADE BY 𝐓𝐇𝐄 𝐏𝐀𝐈𝐍';

// ===================== Dynamic functions =====================

// Returns the current bot image (URL or local file)
export function getBotImage() {
  const customPath = path.join(process.cwd(), 'system', 'customBotImage.jpg');
  if (fs.existsSync(customPath)) return customPath;
  return botImagePath;
}

// Updates the bot image by saving a local file
export function setBotImage(buffer) {
  const customPath = path.join(process.cwd(), 'system', 'customBotImage.jpg');
  fs.writeFileSync(customPath, buffer);
}

// Connection message (uses default image for reference)
export function connectionMessage() {
  return `
╭───❖ ${BOT_NAME} ❖────╮
│ 🤖 Bot : ${BOT_NAME} — CONNECTED
│ ⏱️ Date & Time : ${new Date().toLocaleString()}
│ ⚡ Status : Online & Ready
╰─────────────────────╯
`;
}