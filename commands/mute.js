export default {
  name: "mute",
  async execute(sock, m) {
    if (!m.isGroup) return;
    global.mutedGroups.add(m.chat);
    await sock.sendMessage(m.chat, { text: "🔇 Groupe muté." });
  }
};