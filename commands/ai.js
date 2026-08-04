import config from "../config.js";


export default {

name:"ai",


async execute(sock,m,args){


if(!args.length){

return m.reply(
"🩸 Pose-moi une question."
);

}



const prompt =
args.join(" ");



try{


if(!config.AI_API){

return m.reply(
"❌ IA non configurée dans config.js."
);

}



const res =
await fetch(
`${config.AI_API}?message=${encodeURIComponent(prompt)}`
);



const data =
await res.json();



if(!data?.response){

return m.reply(
"❌ Aucune réponse IA."
);

}



await m.reply(

`╭━━━〔 🩸 𝐓𝐇𝐄 𝐏𝐀𝐈𝐍 – IA 〕━━━╮

${data.response}

╰━━━━━━━━━━━━━━━━━━━╯

☠️ 𝐓𝐇𝐄_𝐏𝐀𝐈𝐍-𝐌𝐃`

);



}
catch(err){


console.log(
"AI ERROR:",
err.message
);


m.reply(
"❌ Service IA indisponible."
);


}


}

};