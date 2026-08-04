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

console.log("🚀 Démarrage de THE_PAIN-MD...");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(text) {
  return new Promise(resolve => rl.question(text, resolve));
}


async function startBot() {

  try {

    const { state, saveCreds } = await useMultiFileAuthState(
      "./auth_info"
    );


    const { version } = await fetchLatestBaileysVersion();


    const sock = makeWASocket({

      version,

      logger: pino({
        level: "silent"
      }),

      browser: Browsers.windows("Chrome"),

      printQRInTerminal: false,

      auth: state,

      markOnlineOnConnect: true,

      syncFullHistory: false

    });


    sock.ev.on(
      "creds.update",
      saveCreds
    );


    // 🔐 Premier démarrage : code de connexion

    if (!sock.authState?.creds?.registered) {

      const phoneNumber = await question(
        "📱 Entre ton numéro WhatsApp avec indicatif (+243...): "
      );


      const code = await sock.requestPairingCode(
        phoneNumber.replace(/[^0-9]/g, "")
      );


      console.log(
        "\n━━━━━━━━━━━━━━━━━━"
      );

      console.log(
        "🔑 CODE DE CONNEXION :",
        code
      );

      console.log(
        "━━━━━━━━━━━━━━━━━━\n"
      );

    }



    sock.ev.on(
      "connection.update",
      async(update)=>{

        const {
          connection,
          lastDisconnect
        } = update;


        if(connection === "open"){

          console.log(
            "✅ THE_PAIN-MD CONNECTÉ AVEC SUCCÈS"
          );

        }



        if(connection === "close"){

          const status =
          lastDisconnect?.error?.output?.statusCode;


          if(
            status === DisconnectReason.loggedOut ||
            status === 401
          ){

            console.log(
              "❌ Compte déconnecté, supprime auth_info puis reconnecte."
            );

          }

          else{

            console.log(
              "🔄 Reconnexion..."
            );

            setTimeout(
              startBot,
              5000
            );

          }

        }

      }
    );



    sock.ev.on(
      "messages.upsert",
      async({messages})=>{

        try{

          const m = messages[0];

          if(!m.message) return;


          if(
            m.key.remoteJid === "status@broadcast"
          )
          return;


          await handleCommand(
            sock,
            m
          );


        }
        catch(err){

          console.log(
            "❌ Erreur message:",
            err.message
          );

        }

      }
    );



    const totalCommands =
    await loadCommands();


    console.log(
      `📦 ${totalCommands} commandes chargées`
    );


  }
  catch(err){

    console.log(
      "❌ Erreur critique:",
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
(err)=>{
 console.log(
 "❌ Crash:",
 err.message
 );
});


process.on(
"unhandledRejection",
(err)=>{
 console.log(
 "❌ Promise:",
 err
 );
});


startBot();