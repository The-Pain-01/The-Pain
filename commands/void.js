export default{
name:"void",
async execute(sock,m){

const msg=`
⚫ VOID PROTOCOL

All signals lost...
Entering darkness...
`

await sock.sendMessage(m.chat,{text:msg},{quoted:m})

}
}