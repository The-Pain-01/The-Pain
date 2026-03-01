import fs from "fs";

const FILE = "./data/aura.json";
if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, "{}");

export default {
  name: "aura",
  async execute(sock, m) {
    const data = JSON.parse(fs.readFileSync(FILE));
    const user = m.sender;

    if (!data[user]) data[user] = 0;
    data[user] += 1;

    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

    const level = Math.floor(data[user] / 10);

    m.reply(
`╔═══ 🩸 𝐀𝐔𝐑𝐀 ═══╗
┃ XP : ${data[user]}
┃ Niveau : ${level}
╚═══════════════╝`);
  }
};