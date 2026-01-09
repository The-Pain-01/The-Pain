import os from 'os'

export default {
  name: 'alive',
  aliases: ['bot', 'status'],
  category: 'core',
  desc: 'Statut sombre du bot',

  async execute(sock, m) {
    try {
      const uptime = process.uptime()
      const h = Math.floor(uptime / 3600)
      const min = Math.floor((uptime % 3600) / 60)
      const sec = Math.floor(uptime % 60)

      const ram = (process.memoryUsage().rss / 1024 / 1024).toFixed(1)

      const text = `
☠️☠️☠️☠️☠️☠️☠️☠️☠️

   𝐓𝐇𝐄_𝐏𝐀𝐈𝐍-𝐌𝐃
「 𝘛𝘩𝘦 𝘱𝘢𝘪𝘯 𝘪𝘴 𝘢𝘭𝘪𝘷𝘦… 」

🩸 Statut : *ÉVEILLÉ*
⏳ Uptime : ${h}h ${min}m ${sec}s
🧠 Mémoire : ${ram} MB
⚙️ Système : ${os.platform()}
🕯 Prefix : ${global.PREFIX}

❝ Celui qui invoque la douleur
   ne trouve jamais le silence ❞

☠️☠️☠️☠️☠️☠️☠️☠️☠️
      `.trim()

      await sock.sendMessage(
        m.chat,
        { text },
        { quoted: m }
      )

    } catch (err) {
      console.error('❌ Alive dark error:', err)
      await sock.sendMessage(
        m.chat,
        { text: '☠️ 𝐓𝐇𝐄_𝐏𝐀𝐈𝐍-𝐌𝐃 murmure encore depuis l’ombre…' },
        { quoted: m }
      )
    }
  }
}
