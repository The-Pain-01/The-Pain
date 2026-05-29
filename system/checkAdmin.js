export async function checkAdmin(sock, chat, user) {

  try {

    const meta =
      await sock.groupMetadata(chat);

    const admins =
      meta.participants
        .filter(v => v.admin)
        .map(v => v.id);

    return admins.includes(user);

  } catch {

    return false;
  }
}