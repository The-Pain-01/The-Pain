export async function checkAdmin(sock, chat, user) {

  try {

    if (!chat.endsWith("@g.us"))
      return false;


    const meta =
      await sock.groupMetadata(chat);


    const admins =
      meta.participants
      .filter(
        p => p.admin
      )
      .map(
        p => p.id
      );


    return admins.includes(user);


  } catch (err) {

    return false;

  }

}