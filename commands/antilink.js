export default {

name:"antilink",

admin:true,


async execute(sock,m){


if(!m.isGroup)

return m.reply(
"☠️ Cette commande est uniquement pour les groupes."
);



if(global.antilinkGroups.has(m.chat)){


global.antilinkGroups.delete(
m.chat
);


await m.reply(
`
╔═══〔 🔓 𝐀𝐍𝐓𝐈𝐋𝐈𝐍𝐊 〕═══╗

🩸 Les liens sont maintenant autorisés.

╚════════════════════╝`
);



}

else{


global.antilinkGroups.add(
m.chat
);



await m.reply(
`
╔═══〔 🚫 𝐀𝐍𝐓𝐈𝐋𝐈𝐍𝐊 〕═══╗

☠️ Les liens sont maintenant bloqués.

╚════════════════════╝`
);


}


}

};