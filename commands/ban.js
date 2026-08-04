export default {

name:"ban",

ownerOnly:true,


async execute(sock,m){


const user =
m.mentionedJid?.[0];


if(!user)
return m.reply(
"☠️ Mentionne un utilisateur."
);



global.bannedUsers ??=
new Set();



global.bannedUsers.add(user);



await m.reply(
"☠️ Utilisateur ajouté à la liste noire."
);


}

};