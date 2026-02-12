const metadata = await sock.groupMetadata(m.chat);
const members = metadata.participants
  .filter(p => !p.admin)
  .map(p => p.id);

await sock.groupParticipantsUpdate(m.chat, members, 'remove');