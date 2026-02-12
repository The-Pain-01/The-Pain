const user = m.mentionedJid[0] || m.quoted?.sender;
await sock.groupParticipantsUpdate(m.chat, [user], 'remove');