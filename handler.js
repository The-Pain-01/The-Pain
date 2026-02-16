// ==================== handler.js ====================
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import config from "./config.js";

const commands = {};
const SETTINGS_FILE = "./data/settings.json";

// ================= LOAD SETTINGS =================
let saved = {};

if (!fs.existsSync("./data")) {
  fs.mkdirSync("./data");
}

if (!fs.existsSync(SETTINGS_FILE)) {
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify({}, null, 2));
}

try {
  saved = JSON.parse(fs.readFileSync(SETTINGS_FILE));
} catch {
  saved = {};
}

global.disabledGroups = new Set(saved.disabledGroups || []);
global.bannedUsers = new Set(saved.bannedUsers || []);
global.welcomeGroups = new Set(saved.welcomeGroups || []);
global.goodbyeGroups = new Set(saved.goodbyeGroups || []);
global.mutedGroups = new Set(saved.mutedGroups || []);
global.antilinkGroups = new Set(saved.antilinkGroups || []);

function saveSettings() {
  fs.writeFileSync(
    SETTINGS_FILE,
    JSON.stringify(
      {
        disabledGroups: [...global.disabledGroups],
        bannedUsers: [...global.bannedUsers],
        welcomeGroups: [...global.welcomeGroups],
        goodbyeGroups: [...global.goodbyeGroups],
        mutedGroups: [...global.mutedGroups],
        antilinkGroups: [...global.antilinkGroups]
      },
      null,
      2
    )
  );
}

// ================= MESSAGE FORMAT =================
const smsg = (sock, m) => {
  if (!m?.message) return {};

  const msg = m.message;
  const mtype = Object.keys(msg)[0];

  const body =
    msg.conversation ||
    msg.extendedTextMessage?.text ||
    msg.imageMessage?.caption ||
    msg.videoMessage?.caption ||
    "";

  const contextInfo = msg?.extendedTextMessage?.contextInfo;
  const quotedMessage = contextInfo?.quotedMessage;

  let quoted = null;

  if (quotedMessage) {
    const quotedType = Object.keys(quotedMessage)[0];

    quoted = {
      mtype: quotedType,
      msg: quotedMessage[quotedType],
      key: {
        remoteJid: m.key.remoteJid,
        fromMe: false,
        id: contextInfo.stanzaId,
        participant: contextInfo.participant
      }
    };
  }

  const sender =
    m.key.fromMe
      ? sock.user.id
      : m.key.participant || m.key.remoteJid;

  const isGroup = m.key.remoteJid.endsWith("@g.us");

  const reply = (text) =>
    sock.sendMessage(m.key.remoteJid, { text }, { quoted: m });

  return {
    ...m,
    mtype,
    body,
    quoted,
    chat: m.key.remoteJid,
    sender,
    isGroup,
    reply,
    isAdmin: false,
    isBotAdmin: false
  };
};

// ================= LOAD COMMANDS =================
async function loadCommands(dir = "./commands") {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);

    if (fs.statSync(full).isDirectory()) {
      await loadCommands(full);
    } else if (file.endsWith(".js")) {
      try {
        const mod = await import(pathToFileURL(full).href);
        const cmd = mod.default || mod;

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

  const m = smsg(sock, mRaw);
  const body = m.body?.trim();
  if (!body) return;

  if (!body.startsWith(config.PREFIX)) return;

  if (global.autoRead) {
    try { await sock.readMessages([m.key]); } catch {}
  }

  const args = body.slice(config.PREFIX.length).trim().split(/\s+/);
  const commandName = args.shift()?.toLowerCase();

  const cmd = commands[commandName];
  if (!cmd) return;

  const senderNumber = m.sender.split("@")[0];
  const isOwner = global.owner?.includes(senderNumber);

  // 🔒 MODE SYSTEM
  if (global.mode === "private" && !isOwner) return;
  if (global.mode === "self" && !isOwner) return;

  // 🔇 MUTE
  if (m.isGroup && global.mutedGroups.has(m.chat) && !isOwner) return;

  // 🚫 ANTILINK
  if (m.isGroup && global.antilinkGroups.has(m.chat)) {
    if (body.match(/chat\.whatsapp\.com/i) && !isOwner) {
      await sock.sendMessage(m.chat, { text: "🚫 Liens interdits !" });
      await sock.groupParticipantsUpdate(
        m.chat,
        [m.sender],
        "remove"
      );
      return;
    }
  }

  if (cmd.ownerOnly && !isOwner) return;

  try {
    await cmd.execute(sock, m, args);
  } catch (err) {
    console.error("❌ Command Error:", err);
    await sock.sendMessage(m.chat, {
      text: "❌ Une erreur est survenue."
    });
  }

  saveSettings();
}

// ================= GROUP UPDATE =================
async function handleParticipantUpdate(sock, update) {
  const { id, participants, action } = update;

  if (action === "add" && global.welcomeGroups.has(id)) {
    for (let user of participants) {
      await sock.sendMessage(id, {
        text: `👋 Bienvenue @${user.split("@")[0]}`,
        mentions: [user]
      });
    }
  }

  if (action === "remove" && global.goodbyeGroups.has(id)) {
    for (let user of participants) {
      await sock.sendMessage(id, {
        text: `👋 Au revoir @${user.split("@")[0]}`,
        mentions: [user]
      });
    }
  }
}

export {
  loadCommands,
  handleParticipantUpdate
};

export default handleCommand;