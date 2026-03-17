export default{
name:"reaper",
async execute(sock,m){

const msg=`
💀 THE REAPER ARRIVES

Someone's fate is sealed...
`

await sock.sendMessage(m.chat,{text:msg},{quoted:m})

}
}