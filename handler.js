// ==================== handler.js (PRO FINAL) ====================
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import config from './config.js';
import { WARN_MESSAGES } from './system/warnMessages.js';

// ================== 📂 SETTINGS ==================
const SETTINGS_FILE = './data/settings.json';
let saved = {};
try {
  saved = JSON.parse(fs.readFileSync(SETTINGS_FILE));
} catch {}

// ================== 🌍 GLOBALS ==================
const commands = {};

global.owner ??= config.OWNER || [];
global.mode ??= saved.mode || 'public'; // public | self | private
global.disabledGroups ??= new Set(saved.disabledGroups || []);
global.bannedUsers ??= new Set(saved.bannedUsers || []);
global.groupThrottle ??= saved.groupThrottle || {};
global.blockInbox ??= saved.blockInbox || false;

global.botModes ??= saved.botModes || {
  typing: false,
  recording: false,
  autoread: { enabled: false }
};

// ================== 💾 SAVE ==================
let saveTimer;
function saveSettings() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify({
      mode: global.mode,
      disabledGroups: [...global.disabledGroups],
      bannedUsers: [...global.bannedUsers],
      groupThrottle: global.groupThrottle,
      blockInbox: global.blockInbox,
      botModes: global.botModes
    }, null, 2));
  }, 1000);
}

// ================== 🧠 SMSG ==================
const smsg = (sock, m) => {
  if (!m?.message) return {};
  const msg = m.message;
  return {
    ...m,
    body:
      msg.conversation ||
      msg.extendedTextMessage?.text ||
      msg.imageMessage?.caption ||
      msg.videoMessage?.caption ||
      '',
    chat: m.key.remoteJid,
    sender: m.key.fromMe ? sock.user.id : (m.key.participant || m.key.remoteJid),
    isGroup: m.key.remoteJid.endsWith('@g.us'),
    mentionedJid: msg.extendedTextMessage?.contextInfo?.mentionedJid || []
  };
};

// ================== 🤖 BOT MODES ==================
async function handleBotModes(sock, m) {
  try {
    if (global.botModes.typing)
      await sock.sendPresenceUpdate('composing', m.chat);
    if (global.botModes.recording)
      await sock.sendPresenceUpdate('recording', m.chat);
  } catch {}
}

async function handleAutoread(sock, m) {
  try {
    if (m?.key?.id)
      await sock.readMessages([m.key]);
  } catch {}
}

// ================== 👑 ADMIN CHECK ==================
async function checkAdmin(sock, chat, user) {
  try {
    const meta = await sock.groupMetadata(chat);
    const admins = meta.participants
      .filter(p => p.admin)
      .map(p => p.id);
    return admins.includes(user);
  } catch {
    return false;
  }
}

// ================== 📦 LOAD COMMANDS ==================
let loaded = false;
const loadCommands = async (dir = './commands') => {
  if (loaded) return;
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) await loadCommands(full);
    else if (file.endsWith('.js')) {
      const mod = await import(pathToFileURL(full).href);
      const cmd = mod.default || mod;
      if (cmd?.name) commands[cmd.name.toLowerCase()] = cmd;
    }
  }
  loaded = true;
};

// ================== ⚙️ HANDLER ==================
async function handleCommand(sock, mRaw) {
  try {
    if (!mRaw?.message) return;

    const m = smsg(sock, mRaw);
    const body = m.body?.trim();
    if (!body) return;

    const PREFIX = global.PREFIX || config.PREFIX;
    if (!body.startsWith(PREFIX)) return;

    const args = body.slice(PREFIX.length).trim().split(/\s+/);
    const commandName = args.shift()?.toLowerCase();
    const cmd = commands[commandName];
    if (!cmd) return;

    const isOwner = global.owner.includes(m.sender.split('@')[0]);
    const isAdmin = m.isGroup ? await checkAdmin(sock, m.chat, m.sender) : false;

    // ===== MODES =====
    await handleBotModes(sock, m);
    if (global.botModes.autoread?.enabled)
      await handleAutoread(sock, m);

    // ===== BOT MODE =====
    if (global.mode === 'self' && !isOwner) return;
    if (global.mode === 'private' && !isOwner)
      return sock.sendMessage(m.chat, { text: WARN_MESSAGES.PRIVATE_MODE }, { quoted: mRaw });

    // ===== BLOCK INBOX =====
    if (global.blockInbox && !m.isGroup && !isOwner)
      return sock.sendMessage(m.chat, { text: WARN_MESSAGES.BLOCK_INBOX }, { quoted: mRaw });

    // ===== BANNED =====
    if (global.bannedUsers.has(m.sender))
      return sock.sendMessage(m.chat, { text: WARN_MESSAGES.BANNED_USER }, { quoted: mRaw });

    // ===== GROUP OFF =====
    if (m.isGroup && global.disabledGroups.has(m.chat) && !isOwner)
      return sock.sendMessage(m.chat, { text: WARN_MESSAGES.BOT_OFF }, { quoted: mRaw });

    // ===== PERMS =====
    if (cmd.ownerOnly && !isOwner)
      return sock.sendMessage(m.chat, { text: WARN_MESSAGES.OWNER_ONLY(commandName) }, { quoted: mRaw });

    if (cmd.admin && !isAdmin && !isOwner)
      return sock.sendMessage(m.chat, { text: WARN_MESSAGES.ADMIN_ONLY(commandName) }, { quoted: mRaw });

    // ===== EXEC =====
    await cmd.execute?.(sock, m, args);
    await cmd.run?.(sock, m, args);

    saveSettings();

  } catch (err) {
    console.error('HANDLER ERROR:', err);
  }
}

// ================== 👥 PARTICIPANT ==================
async function handleParticipantUpdate(sock, update) {
  for (const cmd of Object.values(commands)) {
    if (typeof cmd.participantUpdate === 'function')
      await cmd.participantUpdate(sock, update).catch(() => {});
  }
}

// ================== EXPORT ==================
export {
  loadCommands,
  commands,
  smsg,
  handleParticipantUpdate,
  saveSettings
};

export default handleCommand;