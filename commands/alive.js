import config from "../config.js";
import { IMAGES } from "../system/botAssets.js";


export default {


name:"alive",


category:"general",



async execute(sock,m){



const text = `

╔══════════════════════╗
      ☠️ 𝐀𝐋𝐈𝐕𝐄 ☠️
╚══════════════════════╝


╭─❖ 🩸 𝐒𝐓𝐀𝐓𝐔𝐒 🩸 ❖─╮

│ ͟͟͞ᬼ⃟─► 🤖 𝐁𝐨𝐭 : ${config.BOT_NAME}
│ ͟͟͞ᬼ⃟─► 🟢 𝐒𝐭𝐚𝐭𝐮𝐬 : 𝐎𝐍𝐋𝐈𝐍𝐄
│ ͟͟͞ᬼ⃟─► ⚙️ 𝐌𝐨𝐝𝐞 : ${config.MODE}
│ ͟͟͞ᬼ⃟─► ⏳ 𝐔𝐩𝐭𝐢𝐦𝐞 : ${Math.floor(process.uptime())}s

╰─────────────❖


🩸 Le système est actif.

☠️ 𝐓𝐇𝐄 𝐏𝐀𝐈𝐍 𝐌𝐃 ☠️

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