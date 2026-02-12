export default {
  name: 'recording',
  async execute(sock, m) {
    await sock.sendPresenceUpdate('recording', m.chat);
    setTimeout(() => {
      sock.sendPresenceUpdate('paused', m.chat);
    }, 5000);
  }
};