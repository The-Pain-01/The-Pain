import { saveConfig } from "../config.js";

export default {
  name: "autoread",
  ownerOnly: true,
  async execute(sock, m) {
    global.autoRead = !global.autoRead;
    saveConfig({ autoRead: global.autoRead });

    await sock.sendMessage(m.chat, {
      text: `
╔═══〔 👁️ REGARD ÉTERNEL 👁️ 〕═══╗
🩸 AutoRead : ${global.autoRead ? "ACTIVÉ" : "DÉSACTIVÉ"}
☠️ Aucun message n’échappera à l’ombre.
╚════════════════════╝`
    });
  }
};