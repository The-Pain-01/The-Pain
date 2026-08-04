export default {

name:"antibot",

admin:true,


async execute(sock,m,args){


global.antibot ??= {};


global.antibot[m.chat] =
args[0]?.toLowerCase() === "on";


await m.reply(

global.antibot[m.chat]

?
"🤖 Protection antibot activée."

:
"🤖 Protection antibot désactivée."

);


}

};