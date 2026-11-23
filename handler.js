
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import config from "./config.js";

const commands = {};
global.commands = commands;

const SETTINGS_FILE = "./data/settings.json";

const CATEGORY_STYLES = {
  general: ["⚡", "⚡"],
  admin: ["🛡️", "🛡️"],
  group: ["👥", "👥"],
  settings: ["⚙️", "⚙️"],
  utility: ["🧊", "🧊"],
  fun: ["🎭", "🎭"],
  ai: ["🧠", "🧠"],
  media: ["🎬", "🎬"],
  owner: ["👑", "👑"],
  dark: ["☠️", "☠️"]
};

if (!fs.existsSync("./data")) {
  fs.mkdirSync("./data", { recursive: true });
}

if (!fs.existsSync(SETTINGS_FILE)) {
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify({}, null, 2));
}

function createSettingsStore() {
  let saved = {};

  try {
    saved = JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf8"));
  } catch {
    saved = {};
  }

  return {
    mutedGroups: new Set(saved.mutedGroups || []),
    antilinkGroups: new Set(saved.antilinkGroups || []),
    welcomeGroups: new Set(saved.welcomeGroups || []),
    antibotGroups: new Set(saved.antibotGroups || []),
    bannedUsers: new Set(saved.bannedUsers || [])
  };
}

// Compatibilité temporaire avec les anciennes commandes.
// Le futur gestionnaire de sessions devra fournir un store par session.
const defaultSettings = createSettingsStore();

global.mutedGroups = defaultSettings.mutedGroups;
global.antilinkGroups = defaultSettings.antilinkGroups;
global.welcomeGroups = defaultSettings.welcomeGroups;
global.antibotGroups = defaultSettings.antibotGroups;
global.bannedUsers = defaultSettings.bannedUsers;

export function createSessionSettings() {
  return {
    mutedGroups: new Set(),
    antilinkGroups: new Set(),
    welcomeGroups: new Set(),
    antibotGroups: new Set(),
    bannedUsers: new Set()
  };
}

export function saveSettings(settings = defaultSettings) {
  try {
    fs.writeFileSync(
      SETTINGS_FILE,
      JSON.stringify({
        mutedGroups: [...settings.mutedGroups],
        antilinkGroups: [...settings.antilinkGroups],
        welcomeGroups: [...settings.welcomeGroups],
        antibotGroups: [...settings.antibotGroups],
        bannedUsers: [...settings.bannedUsers]
      }, null, 2)
    );
  } catch (err) {
    console.log("❌ Erreur sauvegarde settings:", err.message);
  }
}

function formatCommandName(name) {
  return String(name || "").trim().toUpperCase();
}

export function getMenu() {
  const grouped = {};

  for (const cmd of Object.values(commands)) {
    const category = cmd.category || "general";

    if (!grouped[category]) {
      grouped[category] = [];
    }

    grouped[category].push(cmd);
  }

  const categories = Object.keys(grouped).sort();

  if (!categories.length) {
    return `
╭─❖ ⚠️ 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄𝐒 ⚠️ ❖─╮
│
│ ͟͟͞ᬼ⃟─► Aucune commande chargée
│
╰─────────────❖`;
  }

  let output = "";

  categories.forEach((category, index) => {
    const commandsList = grouped[category].sort(
      (a, b) => a.name.localeCompare(b.name)
    );

    const style = CATEGORY_STYLES[category] || ["🔹", "🔹"];

    output += `
╭─❖ ${style[0]} 𝐆𝐑𝐎𝐔𝐏𝐄 ${index + 1} ${style[1]} ❖─╮
`;

    for (const cmd of commandsList) {
      output += `│ ͟͟͞ᬼ⃟─► ${formatCommandName(cmd.name)}\n`;
    }

    output += "╰─────────────❖\n\n";
  });

  return output.trim();
}

export async function loadCommands(dir = "./commands") {
  let count = 0;

  for (const key of Object.keys(commands)) {
    delete commands[key];
  }

  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      return 0;
    }

    const files = fs.readdirSync(dir);

    for (const file of files) {
      if (!file.endsWith(".js")) continue;

      const fullPath = path.resolve(dir, file);

      try {
        const module = await import(
          `${pathToFileURL(fullPath).href}?update=${Date.now()}`
        );

        const command = module.default;

        if (
          command?.name &&
          typeof command.execute === "function"
        ) {
          commands[String(command.name).toLowerCase()] = command;
          count++;
        } else {
          console.log(`⚠️ Commande ignorée : ${file}`);
        }
      } catch (err) {
        console.log(`❌ Erreur chargement ${file}:`, err.message);
      }
    }

    global.commands = commands;

    console.log(`📦 ${count} commandes chargées`);

    return count;
  } catch (err) {
    console.log("❌ Erreur lecture commandes:", err.message);
    return 0;
  }
}

function unwrapMessage(message) {
  let current = message;

  while (current) {
    const wrapper =
      current.ephemeralMessage?.message ||
      current.viewOnceMessage?.message ||
      current.viewOnceMessageV2?.message ||
      current.viewOnceMessageV2Extension?.message;

    if (!wrapper) break;
    current = wrapper;
  }

  return current || {};
}

function getMessageText(message) {
  const msg = unwrapMessage(message);

  return (
    msg.conversation ||
    msg.extendedTextMessage?.text ||
    msg.imageMessage?.caption ||
    msg.videoMessage?.caption ||
    msg.documentMessage?.caption ||
    msg.buttonsResponseMessage?.selectedButtonId ||
    msg.listResponseMessage?.singleSelectReply?.selectedRowId ||
    msg.templateButtonReplyMessage?.selectedId ||
    msg.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson ||
    ""
  );
}

function getSender(mRaw, from) {
  if (from.endsWith("@g.us")) {
    return (
      mRaw.key?.participant ||
      mRaw.participant ||
      from
    );
  }

  return (
    mRaw.key?.participant ||
    mRaw.key?.remoteJid ||
    from
  );
}

function createMessageWrapper(sock, mRaw, from, body) {
  const isGroup = from.endsWith("@g.us");
  const sender = getSender(mRaw, from);
  const msg = unwrapMessage(mRaw.message);

  const contextInfo =
    msg.extendedTextMessage?.contextInfo ||
    msg.imageMessage?.contextInfo ||
    msg.videoMessage?.contextInfo ||
    msg.documentMessage?.contextInfo ||
    {};

  return {
    ...mRaw,
    chat: from,
    sender,
    isGroup,
    pushName:
      mRaw.pushName ||
      mRaw.verifiedBizName ||
      "Utilisateur",
    body,
    mentionedJid: contextInfo.mentionedJid || [],
    quoted: contextInfo.quotedMessage
      ? {
          message: contextInfo.quotedMessage,
          participant: contextInfo.participant,
          stanzaId: contextInfo.stanzaId
        }
      : null,
    reply: async (text) => {
      return sock.sendMessage(
        from,
        { text: String(text) },
        { quoted: mRaw }
      );
    }
  };
}

function normalizeJid(value) {
  return String(value || "").trim();
}

function isOwner(sender) {
  const owners = (config.OWNERS || []).map(number => {
    const digits = String(number).replace(/\D/g, "");
    return `${digits}@s.whatsapp.net`;
  });

  const normalizedSender = normalizeJid(sender);

  if (owners.includes(normalizedSender)) {
    return true;
  }

  const senderNumber = normalizedSender.split("@")[0];

  return owners.some(
    owner => owner.split("@")[0] === senderNumber
  );
}

export async function handleCommand(sock, mRaw, sessionContext = {}) {
  try {
    if (!mRaw?.message) return;

    const from = mRaw.key?.remoteJid;

    if (!from || from === "status@broadcast") return;

    const body = getMessageText(mRaw.message).trim();

    if (!body) return;

    const settings = sessionContext.settings || defaultSettings;

    if (sessionContext.autoRead ?? config.AUTO_READ) {
      try {
        await sock.readMessages([mRaw.key]);
      } catch {}
    }

    const prefix = sessionContext.prefix || config.PREFIX;

    if (!body.startsWith(prefix)) return;

    const content = body.slice(prefix.length).trim();

    if (!content) return;

    const parts = content.split(/\s+/);
    const commandName = parts.shift()?.toLowerCase();

    if (!commandName) return;

    const args = parts;
    const command = commands[commandName];

    if (!command) return;

    const isGroup = from.endsWith("@g.us");

    if (isGroup && settings.mutedGroups.has(from)) {
      return;
    }

    const m = createMessageWrapper(sock, mRaw, from, body);
    const sender = m.sender;

    if (settings.bannedUsers.has(sender)) {
      return;
    }

    if (command.groupOnly && !isGroup) {
      return m.reply(
        "👥 Cette commande fonctionne uniquement dans un groupe."
      );
    }

    if (command.ownerOnly && !isOwner(sender)) {
      return m.reply(
        `☠️ Cette commande est réservée au DEV : ${prefix}${commandName}`
      );
    }

    if (command.admin && isGroup) {
      try {
        const metadata = await sock.groupMetadata(from);

        const participant = metadata.participants.find(
          p => p.id === sender || p.lid === sender
        );

        if (!participant?.admin) {
          return m.reply(
            "🛡️ Cette commande nécessite les droits administrateur."
          );
        }
      } catch {
        return m.reply(
          "❌ Impossible de vérifier les droits administrateur."
        );
      }
    }

    try {
      await sock.sendMessage(from, {
        react: {
          text: "🩸",
          key: mRaw.key
        }
      });
    } catch {}

    try {
      await command.execute(sock, m, args, sessionContext);

      try {
        await sock.sendMessage(from, {
          react: {
            text: "✅",
            key: mRaw.key
          }
        });
      } catch {}

      saveSettings(settings);
    } catch (err) {
      console.log(`❌ Erreur .${commandName}:`, err);

      try {
        await sock.sendMessage(from, {
          react: {
            text: "❌",
            key: mRaw.key
          }
        });
      } catch {}

      try {
        await m.reply(
          "❌ Une erreur est survenue pendant l'exécution de la commande."
        );
      } catch {}
    }
  } catch (err) {
    console.log("❌ Handler Fatal Error:", err.message);
  }
}

export async function handleParticipantUpdate(
  sock,
  update,
  sessionContext = {}
) {
  try {
    const { id, participants, action } = update;
    const settings = sessionContext.settings || defaultSettings;

    if (
      action === "add" &&
      settings.welcomeGroups.has(id)
    ) {
      const metadata = await sock
        .groupMetadata(id)
        .catch(() => null);

      const groupName = metadata?.subject || "Groupe";

      for (const user of participants || []) {
        await sock.sendMessage(id, {
          text: `
╭─❖ 🩸 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 🩸 ❖─╮

│ ͟͟͞ᬼ⃟─► Groupe : ${groupName}
│
│ ͟͟͞ᬼ⃟─► Bienvenue @${user.split("@")[0]}

╰─────────────❖`,
          mentions: [user]
        });
      }
    }
  } catch (err) {
    console.log("❌ Participant Update:", err.message);
  }
}

export { commands };
export default handleCommand;
