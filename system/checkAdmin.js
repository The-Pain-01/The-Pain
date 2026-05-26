export async function checkAdmin(sock, chat, user) {

  try {

    const meta =
      await sock.groupMetadata(chat);

    const admins =
      meta.participants
        .filter(p => p.admin)
        .map(p => p.id);

    return admins.includes(user);

  } catch {

    return false;
  }
}