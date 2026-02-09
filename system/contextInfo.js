// system/contextinfo.js
export const CHANNEL_JID = '120363422649925479@newsletter';

/**
 * ContextInfo pour simuler un message transféré depuis une chaîne WhatsApp
 * (newsletter / channel)
 */
export function channelContextInfo() {
  return {
    isForwarded: true,
    forwardingScore: 999, // force l'affichage "Forwarded"
    forwardedNewsletterMessageInfo: {
      newsletterJid: CHANNEL_JID,
      newsletterName: '𝐓𝐇𝐄 𝐏𝐀𝐈𝐍-MD',
      serverMessageId: -1
    }
  };
}