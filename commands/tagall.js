export default {
  name: 'tagall',
  async execute(sock, m) {
    const metadata = await sock.groupMetadata(m.chat);
    const members = metadata.participants;

    const emojis = ['☠️','🩸','👁️','🔥','⚔️','🕷️','🕸️','💀','👑','🩶'];

    let text = `
╔═══〔 ${metadata.subject} 〕═══╗
Membres : ${members.length}

⚠️ VOUS ÊTES CONVOQUÉS.
Le silence n’est pas une option.
Répondez à l’appel… ou subissez les conséquences.
╚══════════════════╝

`;

    let mentions = [];

    members.forEach(member => {
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      text += `${randomEmoji} @${member.id.split('@')[0]}\n`;
      mentions.push(member.id);
    });

    await sock.sendMessage(m.chat, {
      text,
      mentions
    });
  }
};