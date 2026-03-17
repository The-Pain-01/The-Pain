export default{
name:"hex",
async execute(sock,m){

const msg=`
🔮 DARK HEX CASTED

A curse has been unleashed...
`

await sock.sendMessage(m.chat,{text:msg},{quoted:m})

}
}