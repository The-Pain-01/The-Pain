export default {

name:"autoread",

ownerOnly:true,


async execute(sock,m){


global.autoRead =
!global.autoRead;



await m.reply(
`
╔═══〔 👁️ 𝐀𝐔𝐓𝐎 𝐑𝐄𝐀𝐃 〕═══╗

🩸 AutoRead :
${global.autoRead ? "ACTIVÉ" : "DÉSACTIVÉ"}

☠️ THE PAIN SYSTEM

╚════════════════════╝
`
);


}

};