export default {
  name: "goodbye",

  async execute(sock, m) {
    if (!m.isGroup) return;

    if (global.goodbyeGroups.has(m.chat)) {
      global.goodbyeGroups.delete(m.chat);
      await sock.sendMessage(m.chat, {
        text: "👁️ Les disparitions ne seront plus annoncées."
      });
    } else {
      global.goodbyeGroups.add(m.chat);
      await sock.sendMessage(m.chat, {
        text: "💀 Chaque fuite sera publiquement humiliée."
      });
    }
  },

  async participantUpdate(sock, update) {
    const { id, participants, action } = update;
    if (!global.goodbyeGroups.has(id)) return;
    if (action !== "remove") return;

    const metadata = await sock.groupMetadata(id).catch(() => null);
    const groupName = metadata?.subject || "Royaume Obscur";

    for (let user of participants) {
      await sock.sendMessage(id, {
        text: `
╔═══〔 ☠️ ÂME REJETÉE ☠️ 〕═══╗
👁️ Groupe : *${groupName}*

💀 @${user.split("@")[0]} a quitté le royaume…

🩸 Courage : inexistant.
📉 Niveau : catastrophique.
👟 Fuite détectée.

😂 Même les fantômes n’ont pas remarqué son absence.

Que les portes se referment derrière lui.
╚════════════════════╝
`,
        mentions: [user]
      });
    }
  }
};