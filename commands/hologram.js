export default{
name:"hologram",
async execute(sock,m){

const holo=`
╔══════════════╗
║ HOLOGRAM UI ║
║ 𝐓𝐇𝐄 𝐏𝐀𝐈𝐍 𝐌𝐃 ║
╚══════════════╝
`

await sock.sendMessage(m.chat,{text:holo},{quoted:m})

}
}