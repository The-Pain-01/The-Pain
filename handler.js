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
  fs.writeFileSync(
    SETTINGS_FILE,
    JSON.stringify({}, null, 2)
  );
}

let saved = {};

try {
  saved = JSON.parse(
    fs.readFileSync(SETTINGS_FILE, "utf8")
  );
} catch {
  saved = {};
}

global.mutedGroups =
  new Set(saved.mutedGroups || []);

global.antilinkGroups =
  new Set(saved.antilinkGroups || []);

global.welcomeGroups =
  new Set(saved.welcomeGroups || []);

global.antibotGroups =
  new Set(saved.antibotGroups || []);

global.bannedUsers =
  new Set(saved.bannedUsers || []);

function saveSettings() {
  try {
    fs.writeFileSync(
      SETTINGS_FILE,
      JSON.stringify(
        {
          mutedGroups: [
            ...global.mutedGroups
          ],

          antilinkGroups: [
            ...global.antilinkGroups
          ],

          welcomeGroups: [
            ...global.welcomeGroups
          ],

          antibotGroups: [
            ...global.antibotGroups
          ],

          bannedUsers: [
            ...global.bannedUsers
          ]
        },
        null,
        2
      )
    );
  } catch (err) {
    console.log(
      "❌ Erreur sauvegarde settings:",
      err.message
    );
  }
}

function getCategoryName(category) {
  if (!category) return "𝐆𝐄𝐍𝐄𝐑𝐀𝐋";

  return category
    .toString()
    .trim()
    .toUpperCase()
    .replace(/_/g, " ");
}

function formatCommandName(name) {
  return name
    .toString()
    .trim()
    .toUpperCase();
}

export function getMenu() {
  const grouped = {};

  for (const cmd of Object.values(commands)) {
    const category =
      cmd.category || "general";

    if (!grouped[category]) {
      grouped[category] = [];
    }

    grouped[category].push(cmd);
  }

  const categories =
    Object.keys(grouped).sort();

  if (!categories.length) {
    return `
╭─❖ ⚠️ 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄𝐒 ⚠️ ❖─╮
│
│ ͟͟͞ᬼ⃟─► Aucune commande chargée
│
╰─────────────❖
`;
  }

  let output = "";

  categories.forEach((category, index) => {
    const commandsList =
      grouped[category].sort(
        (a, b) =>
          a.name.localeCompare(b.name)
      );

    const style =
      CATEGORY_STYLES[category] ||
      ["🔹", "🔹"];

    const leftEmoji = style[0];
    const rightEmoji = style[1];

    output +=
`
╭─❖ ${leftEmoji} 𝐆𝐑𝐎𝐔𝐏𝐄 ${index + 1} ${rightEmoji} ❖─╮
`;

    for (const cmd of commandsList) {
      output +=
`│ ͟͟͞ᬼ⃟─► ${formatCommandName(cmd.name)}
`;
    }

    output +=
`╰─────────────❖

`;
  });

  return output.trim();
}

export async function loadCommands(
  dir = "./commands"
) {
  let count = 0;

  commands &&
    Object.keys(commands).forEach(
      key => delete commands[key]
    );

  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true
      });

      return 0;
    }

    const files =
      fs.readdirSync(dir);

    for (const file of files) {
      if (!file.endsWith(".js")) {
        continue;
      }

      const fullPath =
        path.resolve(dir, file);

      try {
        const module =
          await import(
            `${pathToFileURL(fullPath).href}?update=${Date.now()}`
          );

        const command =
          module.default;

        if (
          command?.name &&
          typeof command.execute ===
            "function"
        ) {
          commands[
            command.name
              .toString()
              .toLowerCase()
          ] = command;

          count++;
        } else {
          console.log(
            `⚠️ Commande ignorée ${file}`
          );
        }
      } catch (err) {
        console.log(
          `❌ Erreur chargement ${file}:`,
          err.message
        );
      }
    }

    global.commands = commands;

    return count;

  } catch (err) {
    console.log(
      "❌ Erreur lecture commandes:",
      err.message
    );

    return 0;
  }
}

function getMessageText(message) {
  return (
    message?.conversation ||
    message?.extendedTextMessage?.text ||
    message?.imageMessage?.caption ||
    message?.videoMessage?.caption ||
    message?.documentMessage?.caption ||
    message?.buttonsResponseMessage
      ?.selectedButtonId ||
    message?.listResponseMessage
      ?.singleSelectReply
      ?.selectedRowId ||
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

  return from;
}

function createMessageWrapper(
  sock,
  mRaw,
  from,
  body
) {
  const isGroup =
    from.endsWith("@g.us");

  const sender =
    getSender(mRaw, from);

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

    mentionedJid:
      mRaw.message
        ?.extendedTextMessage
        ?.contextInfo
        ?.mentionedJid ||
      mRaw.message
        ?.imageMessage
        ?.contextInfo
        ?.mentionedJid ||
      [],

    quoted:
      mRaw.message
        ?.extendedTextMessage
        ?.contextInfo
        ?.quotedMessage
        ? {
            message:
              mRaw.message
                .extendedTextMessage
                .contextInfo
                .quotedMessage
          }
        : null,

    reply: async text => {
      return sock.sendMessage(
        from,
        { text },
        { quoted: mRaw }
      );
    }
  };
}

export async function handleCommand(
  sock,
  mRaw
) {
  try {
    if (!mRaw?.message) return;

    const from =
      mRaw.key?.remoteJid;

    if (!from) return;

    if (
      from ===
      "status@broadcast"
    ) {
      return;
    }

    const body =
      getMessageText(
        mRaw.message
      ).trim();

    if (!body) return;

    if (
      config.AUTO_READ
    ) {
      try {
        await sock.readMessages([
          mRaw.key
        ]);
      } catch {}
    }

    if (
      !body.startsWith(
        config.PREFIX
      )
    ) {
      return;
    }

    const content =
      body
        .slice(
          config.PREFIX.length
        )
        .trim();

    if (!content) return;

    const parts =
      content.split(/\s+/);

    const commandName =
      parts
        .shift()
        ?.toLowerCase();

    if (!commandName) return;

    const args = parts;

    const command =
      commands[commandName];

    if (!command) return;

    const isGroup =
      from.endsWith("@g.us");

    if (
      isGroup &&
      global.mutedGroups.has(from)
    ) {
      return;
    }

    const m =
      createMessageWrapper(
        sock,
        mRaw,
        from,
        body
      );

    const sender =
      m.sender;

    if (
      global.bannedUsers.has(
        sender
      )
    ) {
      return;
    }

    if (
      command.groupOnly &&
      !isGroup
    ) {
      return m.reply(
        "👥 Cette commande fonctionne uniquement dans un groupe."
      );
    }

    if (
      command.ownerOnly
    ) {
      const owners =
        config.OWNERS
          .filter(Boolean)
          .map(
            number =>
              `${number}`.replace(
                /\D/g,
                ""
              ) +
              "@s.whatsapp.net"
          );

      if (
        !owners.includes(
          sender
        )
      ) {
        return m.reply(
          `☠️ Cette commande est réservée au DEV : ${config.PREFIX}${commandName}`
        );
      }
    }

    if (
      command.admin &&
      isGroup
    ) {
      try {
        const metadata =
          await sock.groupMetadata(
            from
          );

        const participant =
          metadata.participants.find(
            p =>
              p.id === sender ||
              p.lid === sender
          );

        if (
          !participant?.admin
        ) {
          return m.reply(
            `🛡️ Cette commande nécessite les droits administrateur.`
          );
        }
      } catch {
        return m.reply(
          "❌ Impossible de vérifier les droits administrateur."
        );
      }
    }

    try {
      await sock.sendMessage(
        from,
        {
          react: {
            text: "🩸",
            key: mRaw.key
          }
        }
      );
    } catch {}

    try {
      await command.execute(
        sock,
        m,
        args
      );

      try {
        await sock.sendMessage(
          from,
          {
            react: {
              text: "✅",
              key: mRaw.key
            }
          }
        );
      } catch {}

      saveSettings();

    } catch (err) {
      console.log(
        `❌ Erreur .${commandName}:`,
        err
      );

      try {
        await sock.sendMessage(
          from,
          {
            react: {
              text: "❌",
              key: mRaw.key
            }
          }
        );
      } catch {}

      try {
        await m.reply(
          "❌ Une erreur est survenue pendant l'exécution de la commande."
        );
      } catch {}
    }

  } catch (err) {
    console.log(
      "❌ Handler Fatal Error:",
      err.message
    );
  }
}

export async function handleParticipantUpdate(
  sock,
  update
) {
  try {
    const {
      id,
      participants,
      action
    } = update;

    if (
      action === "add" &&
      global.welcomeGroups.has(id)
    ) {
      const metadata =
        await sock
          .groupMetadata(id)
          .catch(() => null);

      const groupName =
        metadata?.subject ||
        "Groupe";

      for (
        const user
        of participants
      ) {
        await sock.sendMessage(
          id,
          {
            text:
`╭─❖ 🩸 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 🩸 ❖─╮

│ ͟͟͞ᬼ⃟─► Groupe : ${groupName}
│
│ ͟͟͞ᬼ⃟─► Bienvenue @${user.split("@")[0]}

╰─────────────❖`,
            mentions: [user]
          }
        );
      }
    }

  } catch (err) {
    console.log(
      "❌ Participant Update:",
      err.message
    );
  }
}

export { commands };

export default handleCommand;