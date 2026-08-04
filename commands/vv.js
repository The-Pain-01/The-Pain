import { getQuotedMedia } from "../system/getQuotedMedia.js";


export default {

name:"vv",


async execute(sock,m){


const media =
getQuotedMedia(m);


if(!media)

return m.reply(
"☠️ Aucun média trouvé."
);



if(media.type==="image"){

const buffer =
await sock.downloadMediaMessage({
message:{
imageMessage:media.message
}
});


return sock.sendMessage(
m.chat,
{
image:buffer,
caption:"🩸 VIEW ONCE DÉVOILÉ"
},
{quoted:m}
);

}



if(media.type==="video"){

const buffer =
await sock.downloadMediaMessage({
message:{
videoMessage:media.message
}
});


return sock.sendMessage(
m.chat,
{
video:buffer,
caption:"🩸 VIEW ONCE DÉVOILÉ"
},
{quoted:m}
);

}


}

};