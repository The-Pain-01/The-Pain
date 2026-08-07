import config from "../config.js";
import { getMenu } from "../handler.js";
import { AUDIOS } from "../system/botAssets.js";


export default {


name:"menu",


category:"general",



async execute(sock,m){



const uptime =
process.uptime();



const h =
Math.floor(uptime / 3600);



const min =
Math.floor((uptime % 3600) / 60);



const sec =
Math.floor(uptime % 60);



const text = `

╔══════════════════════╗
     ☠️ 𝐓𝐇𝐄 𝐏𝐀𝐈𝐍 𝐌𝐃 ☠️
╚══════════════════════╝


╭─❖ 🩸 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎 🩸 ❖─╮

│ ͟͟͞ᬼ⃟─► 🤖 𝐁𝐨𝐭 : ${config.BOT_NAME}
│ ͟͟͞ᬼ⃟─► 👤 𝐔𝐬𝐞𝐫 : ${m.pushName || "Unknown"}
│ ͟͟͞ᬼ⃟─► 👑 𝐃𝐞𝐯 : ${config.OWNER_NAME}
│ ͟͟͞ᬼ⃟─► ⚙️ 𝐌𝐨𝐝𝐞 : ${config.MODE}
│ ͟͟͞ᬼ⃟─► 📦 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 : ${config.VERSION}
│ ͟͟͞ᬼ⃟─► ⏳ 𝐔𝐩𝐭𝐢𝐦𝐞 : ${h}h ${min}m ${sec}s
│ ͟͟͞ᬼ⃟─► 🧩 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐞𝐬 : ${Object.keys(global.commands).length}

╰─────────────❖



${getMenu()}



╭─❖ 🌐 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 🌐 ❖─╮

│ ͟͟͞ᬼ⃟─► ⏤͟͟͞𝐓𝐇𝐄 亗 𝐏𝐀𝐈𝐍 亗 𝐓𝐄𝐂𝐇᭄

╰─────────────❖



🩸 POWERED BY —͟͟͞͞𝐓𝐇𝐄 ➪ 𝐏𝐀𝐈𝐍 ᭄ 🩸

`;



await sock.sendMessage(

m.chat,

{

image:{
url:config.MENU_IMAGE
},

caption:text

},

{
quoted:m
}

);



await sock.sendMessage(

m.chat,

{

audio:{
url:AUDIOS.menu
},

mimetype:"audio/mpeg",

ptt:false

},

{
quoted:m
}

);



}

};