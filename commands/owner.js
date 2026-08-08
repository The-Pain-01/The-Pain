import config from "../config.js";
import { IMAGES } from "../system/botAssets.js";


export default {


name:"owner",


category:"general",



async execute(sock,m){



const number =
config.OWNERS[0];



const text = `

╔══════════════════════╗
        👑 𝐃𝐄𝐕 👑
╚══════════════════════╝


╭─❖ 👤 𝐂𝐑𝐄𝐀𝐓𝐄𝐔𝐑 ❖─╮

│ ͟͟͞ᬼ⃟─► ${config.OWNER_NAME}
│ ͟͟͞ᬼ⃟─► 📱 wa.me/${number}

╰─────────────❖


☠️ 𝐓𝐇𝐄 𝐏𝐀𝐈𝐍 𝐌𝐃 ☠️

`;



await sock.sendMessage(

m.chat,

{

image:{
url:IMAGES.owner
},

caption:text,

mentions:[
number+"@s.whatsapp.net"
]

},

{
quoted:m
}

);



}

};