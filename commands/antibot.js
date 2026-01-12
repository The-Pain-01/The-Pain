export default {
  name: 'antibot',
  admin: true,
  async execute(sock, m, args) {
    global.antibot ??= {};
    global.antibot[m.chat] = args[0] === 'on';

    await sock.sendMessage(m.chat, {
      text: args[0] === 'on'
        ? '🤖 Les intrus mécaniques seront éliminés.'
        : '🤖 Les bots sont tolérés.'
    }, { quoted: m });
  }
};