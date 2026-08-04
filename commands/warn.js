export default {

name:"warn",

admin:true,


async execute(sock,m){


const user =
m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];


if(!user)
return m.reply("⚠️ Mentionne un utilisateur.");



global.warns ??= {};

global.warns[user] =
(global.warns[user] || 0)+1;



m.reply(
`⚠️ Avertissement ${global.warns[user]} — l’ombre se rapproche.`
);


}

};