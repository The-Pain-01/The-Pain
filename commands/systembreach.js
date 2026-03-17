export default{
name:"systembreach",
async execute(sock,m){

const msg=`
⚠ SYSTEM BREACH DETECTED ⚠

Accessing database...
Bypassing firewall...
Decrypting files...

ROOT ACCESS GRANTED
`

await sock.sendMessage(m.chat,{text:msg},{quoted:m})

}
}