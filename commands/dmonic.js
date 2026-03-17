export default{
name:"demonic",
async execute(sock,m,args){

const text=args.join(" ")
if(!text) return m.reply("Give text")

const demonic=`👹 DEMONIC MESSAGE 👹

${text}`

await sock.sendMessage(m.chat,{text:demonic},{quoted:m})

}
}