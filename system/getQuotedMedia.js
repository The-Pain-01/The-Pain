export function getQuotedMedia(m){


try{


const quoted =

m.message
?.extendedTextMessage
?.contextInfo
?.quotedMessage;



if(!quoted)
return null;



if(quoted.imageMessage){


return {

type:"image",

message:quoted.imageMessage

};


}



if(quoted.videoMessage){


return {

type:"video",

message:quoted.videoMessage

};


}



if(quoted.audioMessage){


return {

type:"audio",

message:quoted.audioMessage

};


}



if(quoted.stickerMessage){


return {

type:"sticker",

message:quoted.stickerMessage

};


}



return null;



}
catch{


return null;


}


}