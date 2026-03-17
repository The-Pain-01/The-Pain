export default{
name:"virus",
async execute(sock,m){

const msg=`
☣ VIRUS.EXE

Installing malware...
Accessing files...
Device compromised.
`

await sock.sendMessage(m.chat,{text:msg},{quoted:m})

}
}