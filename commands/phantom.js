export default{
name:"phantom",
async execute(sock,m){

await sock.sendMessage(m.chat,{
text:"⚠ PHANTOM MODE ACTIVATED ⚠",
contextInfo:{isForwarded:true,forwardingScore:999}
},{quoted:m})

}
}