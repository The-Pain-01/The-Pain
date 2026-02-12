if (!m.quoted || m.quoted.mtype !== 'stickerMessage')
  return m.reply('Réponds à un sticker.');

const buffer = await m.quoted.download();
await sock.sendMessage(m.chat, {
  image: buffer
});