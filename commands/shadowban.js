export default{
name:"shadowban",
async execute(sock,m){

await sock.sendMessage(m.chat,{
text:"☠ SHADOW BAN ACTIVATED ☠"
},{quoted:m})

}
}