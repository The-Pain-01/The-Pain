export default {
name: "darkai",
async execute(sock,m,args){

const q=args.join(" ")
if(!q) return m.reply("Give a question")

const reply=`☠ DARK AI RESPONSE ☠

Your question:
${q}

The darkness whispers...
Trust no one.`

await sock.sendMessage(m.chat,{text:reply},{quoted:m})

}
}