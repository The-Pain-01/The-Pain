export default{
name:"nightmare",
async execute(sock,m){

const msg=`
☠ NIGHTMARE PROTOCOL

Your worst fears are watching...
`

await sock.sendMessage(m.chat,{text:msg},{quoted:m})

}
}