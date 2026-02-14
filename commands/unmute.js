export default {
  name: "unmute",
  async execute(sock, m) {
    if (!m.isGroup) return;
    global.mutedGroups.delete(m.chat);
    await sock.sendMessage(m.chat, { text: "🔊 Groupe réactivé." });
  }
};