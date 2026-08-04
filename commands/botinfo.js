import config from "../config.js";


export default {

name:"botinfo",


async execute(sock,m){


const text = `

☠️ ${config.BOT_NAME} ☠️


🤖 Bot :
${config.BOT_NAME}


⚙️ Mode :
${config.MODE.toUpperCase()}


⏳ Uptime :
${Math.floor(process.uptime())}s


🩸 Système stable

☠️ THE PAIN SYSTEM ACTIVE

`;



await m.reply(text);


}

};