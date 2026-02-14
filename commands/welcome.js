export default {
  name: "welcome",

  async execute(sock, m) {
    if (!m.isGroup) return;

    if (global.welcomeGroups.has(m.chat)) {
      global.welcomeGroups.delete(m.chat);
      await sock.sendMessage(m.chat, {
        text: "☠️ Le portail d’accueil est désormais scellé."
      });
    } else {
      global.welcomeGroups.add(m.chat);
      await sock.sendMessage(m.chat, {
        text: "🩸 Le portail d’accueil est ouvert. Chaque nouvelle âme sera annoncée."
      });
    }
  },

  async participantUpdate(sock, update) {
    const { id, participants, action } = update;
    if (!global.welcomeGroups.has(id)) return;
    if (action !== "add") return;

    const metadata = await sock.groupMetadata(id).catch(() => null);
    const groupName = metadata?.subject || "Territoire Inconnu";

    for (let user of participants) {
      await sock.sendMessage(id, {
        text: `
╔═══〔 🩸 PORTAIL OUVERT 🩸 〕═══╗
👁️ Groupe : *${groupName}*

Une nouvelle présence vient troubler l’ombre…

Bienvenue @${user.split("@")[0]}

☠️ Survis… si tu en es capable.
╚════════════════════╝
`,
        mentions: [user]
      });
    }
  }
};