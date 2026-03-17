export default{
name:"omen",
async execute(sock,m){

const predictions=[
"Darkness approaches...",
"A storm is coming...",
"Trust will be broken...",
"Your path changes tonight..."
]

const pick=predictions[Math.floor(Math.random()*predictions.length)]

await sock.sendMessage(m.chat,{text:"🔮 OMEN:\n"+pick},{quoted:m})

}
}