export default {
  name: "antilink",
  async execute(sock, m) {
    if (!m.isGroup) return;

    if (global.antilinkGroups.has(m.chat)) {
      global.antilinkGroups.delete(m.chat);
      await sock.sendMessage(m.chat, {
        text: `
╔═══〔 🔓 CHAOS AUTORISÉ 🔓 〕═══╗
🩸 Les liens sont tolérés… pour l’instant.
╚════════════════════╝`
      });
    } else {
      global.antilinkGroups.add(m.chat);
      await sock.sendMessage(m.chat, {
        text: `
╔═══〔 🚫 INTERDIT SACRÉ 🚫 〕═══╗
☠️ Les liens sont désormais bannis.
🩸 Toute transgression sera punie.
╚════════════════════╝`
      });
    }
  }
};