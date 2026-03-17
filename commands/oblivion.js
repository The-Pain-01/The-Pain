export default{
name:"oblivion",
async execute(sock,m){

const msg=`
☠ OBLIVION MODE

All traces erased.
`

await sock.sendMessage(m.chat,{text:msg},{quoted:m})

}
}