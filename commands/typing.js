export default {
  name: 'typing',
  async execute(sock, m) {
    await sock.sendPresenceUpdate('composing', m.chat);
    setTimeout(() => {
      sock.sendPresenceUpdate('paused', m.chat);
    }, 5000);
  }
};