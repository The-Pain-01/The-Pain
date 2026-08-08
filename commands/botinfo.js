import config from "../config.js";
import { IMAGES } from "../system/botAssets.js";


export default {


name:"botinfo",


category:"general",



async execute(sock,m){



const text = `

╔══════════════════════╗
     ☠️ 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎 ☠️
╚══════════════════════╝


╭─❖ 🩸 𝐈𝐍𝐅𝐎𝐒 🩸 ❖─╮

│ ͟͟͞ᬼ⃟─► 🤖 𝐁𝐨𝐭 : ${config.BOT_NAME}
│ ͟͟͞ᬼ⃟─► 👤 𝐔𝐬𝐞𝐫 : ${m.pushName || "Unknown"}
│ ͟͟͞ᬼ⃟─► 👑 𝐃𝐞𝐯 : ${config.OWNER_NAME}
│ ͟͟͞ᬼ⃟─► ⚙️ 𝐌𝐨𝐝𝐞 : ${config.MODE}
│ ͟͟͞ᬼ⃟─► 📦 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 : ${config.VERSION}
│ ͟͟͞ᬼ⃟─► ⏳ 𝐔𝐩𝐭𝐢𝐦𝐞 : ${Math.floor(process.uptime())}s
│ ͟͟͞ᬼ⃟─► 🧩 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐞𝐬 : ${Object.keys(global.commands).length}

╰─────────────❖


🩸 𝐏𝐀𝐈𝐍 𝐒𝐘𝐒𝐓𝐄𝐌 𝐀𝐂𝐓𝐈𝐕𝐄 🩸

`;



await sock.sendMessage(

m.chat,

{

image:{
url:IMAGES.botinfo
},

caption:text

},

{
quoted:m
}

);



}

};