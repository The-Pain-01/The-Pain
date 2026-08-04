import config from "../config.js";


export default {

name:"brain",


async execute(sock,m,args){


if(!args.length)
return m.reply(
"🧠 Pose une question."
);



try{


const res =
await fetch(
"https://openrouter.ai/api/v1/chat/completions",
{
method:"POST",

headers:{
Authorization:
`Bearer ${config.OPENROUTER_API_KEY}`,

"Content-Type":
"application/json"
},


body:JSON.stringify({

model:
"mistralai/mistral-7b-instruct",

messages:[

{
role:"system",
content:
"Tu es THE PAIN, une IA sombre, intelligente et concise."
},

{
role:"user",
content:
args.join(" ")
}

]

})

}
);



const data =
await res.json();



const reply =
data.choices?.[0]?.message?.content;



if(!reply)
return m.reply(
"❌ Pas de réponse IA."
);



m.reply(
`
╔═══ 🧠 𝐁𝐑𝐀𝐈𝐍 ═══╗

${reply}

╚══════════════════╝
`
);



}
catch(err){

console.log(err.message);

m.reply(
"❌ Erreur IA."
);

}


}

};