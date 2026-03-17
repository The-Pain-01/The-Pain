export default{
name:"glitch",
async execute(sock,m,args){

let text=args.join(" ")
if(!text) return m.reply("Give text")

const glitch=text.split("").join("҉")

await sock.sendMessage(m.chat,{text:glitch},{quoted:m})

}
}