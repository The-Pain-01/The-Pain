import makeWASocket, {
  fetchLatestBaileysVersion,
  Browsers,
  DisconnectReason,
  useMultiFileAuthState
} from "@whiskeysockets/baileys";

import pino from "pino";
import readline from "readline";
import config from "./config.js";
import { handleCommand, loadCommands } from "./handler.js";
import { IMAGES, AUDIOS } from "./system/botAssets.js";


console.log(`
☠️ 𝐓𝐇𝐄 𝐏𝐀𝐈𝐍 𝐌𝐃 ☠️

🚀 SYSTEM STARTING...
`);



const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function ask(text){

return new Promise(resolve=>{

rl.question(text,answer=>{

resolve(answer);

});

});

}



async function startBot(){


try{


const { state, saveCreds } =
await useMultiFileAuthState("./session");



const { version } =
await fetchLatestBaileysVersion();



const sock =
makeWASocket({

version,

logger:pino({
level:"silent"
}),

browser:
Browsers.ubuntu("Chrome"),

auth:state,

printQRInTerminal:false,

markOnlineOnConnect:true

});



if(!state.creds.registered){


let number =
await ask(`

╭─❖ 📱 CONNEXION ❖─╮

Entre ton numéro WhatsApp :

Format :
✔ Sans +
✔ Sans espace

Exemple :
27727500078

Numéro : `);



number =
number.replace(/\D/g,"");



console.log(`

🔐 Génération du code...

`);



const code =
await sock.requestPairingCode(number);



console.log(`

╭─❖ ☠️ CODE PAIRING ☠️ ❖─╮

│ ${code}

╰─────────────❖

`);




try{


await sock.sendMessage(
number+"@s.whatsapp.net",
{

image:{
url:IMAGES.connect
},

caption:`

☠️ 𝐓𝐇𝐄 𝐏𝐀𝐈𝐍 𝐌𝐃 ☠️


🔐 Code de connexion :

${code}


🩸 Entre ce code dans WhatsApp.

`


}
);



await sock.sendMessage(
number+"@s.whatsapp.net",
{

audio:{
url:AUDIOS.connect
},

mimetype:"audio/mpeg"

}

);



}
catch{}



}



sock.ev.on(
"creds.update",
saveCreds
);



sock.ev.on(
"connection.update",
async(update)=>{


const {
connection,
lastDisconnect
}=update;



if(connection==="open"){


console.log(`

✅ BOT CONNECTÉ

☠️ 𝐓𝐇𝐄 𝐏𝐀𝐈𝐍 𝐌𝐃 ACTIVE

`);


}



if(connection==="close"){


const status =
lastDisconnect
?.error
?.output
?.statusCode;



if(
status===DisconnectReason.loggedOut ||
status===401
){


console.log(
"❌ Session invalide"
);


}
else{


console.log(
"🔄 Reconnexion..."
);


startBot();


}


}



});



sock.ev.on(
"messages.upsert",
async({messages})=>{


const m =
messages[0];


if(!m?.message)
return;



if(
m.key.remoteJid==="status@broadcast"
)
return;



await handleCommand(
sock,
m
);



});



const total =
await loadCommands();



console.log(
`📦 ${total} commandes chargées`
);



}
catch(err){


console.log(
"❌ ERREUR :",
err.message
);


setTimeout(
startBot,
5000
);


}


}



process.on(
"uncaughtException",
err=>
console.log(
"Crash :",
err.message
)
);



process.on(
"unhandledRejection",
err=>
console.log(
"Rejection :",
err
)
);



startBot();