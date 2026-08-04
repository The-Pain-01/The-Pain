import fs from "fs";

const DIR = "./data";
const FILE = "./data/aura.json";


if (!fs.existsSync(DIR)) {
  fs.mkdirSync(DIR, { recursive:true });
}


if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, "{}");
}


export default {

name:"aura",


async execute(sock,m){


let data = {};


try {
data = JSON.parse(
fs.readFileSync(FILE)
);
}
catch{
data = {};
}



const user = m.sender;


if(!data[user])
data[user]=0;


data[user]++;



fs.writeFileSync(
FILE,
JSON.stringify(data,null,2)
);



const level =
Math.floor(data[user]/10);



m.reply(
`╔═══ 🩸 𝐀𝐔𝐑𝐀 ═══╗

┃ XP : ${data[user]}
┃ Niveau : ${level}

╚═══════════════╝`
);


}

};