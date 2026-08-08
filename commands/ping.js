export default {


name:"ping",


category:"general",



async execute(sock,m){



const start =
Date.now();



await sock.sendMessage(

m.chat,

{

text:"⚡ Test de connexion..."

},

{
quoted:m
}

);



const speed =
Date.now()-start;



const text = `

╭─❖ ⚡ 𝐏𝐈𝐍𝐆 ⚡ ❖─╮

│ ͟͟͞ᬼ⃟─► 🚀 𝐕𝐢𝐭𝐞𝐬𝐬𝐞 : ${speed}ms
│ ͟͟͞ᬼ⃟─► 🤖 𝐒𝐲𝐬𝐭𝐞̀𝐦𝐞 : 𝐎𝐊
│ ͟͟͞ᬼ⃟─► ☠️ 𝐏𝐀𝐈𝐍 𝐌𝐃 : 𝐀𝐂𝐓𝐈𝐅

╰─────────────❖


🩸 Connexion stable.

`;



await sock.sendMessage(

m.chat,

{

text

},

{
quoted:m
}

);



}

};