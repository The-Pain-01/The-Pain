
export async function checkAdmin(sock, chat, user) {
  try {
    if (!chat?.endsWith("@g.us") || !user) {
      return false;
    }

    const metadata = await sock.groupMetadata(chat);

    const participant = metadata.participants.find(p =>
      p.id === user || p.lid === user
    );

    return Boolean(participant?.admin);
  } catch {
    return false;
  }
}
