export default{
name:"matrix",
async execute(sock,m){

let matrix=""

for(let i=0;i<60;i++){
matrix+=Math.random()>0.5?"1":"0"
matrix+=" "
}

await sock.sendMessage(m.chat,{text:matrix},{quoted:m})

}
}