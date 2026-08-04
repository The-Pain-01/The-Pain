export const WARN_MESSAGES = {

  PRIVATE_MODE:
    "☠️ 𝐓𝐇𝐄 𝐏𝐀𝐈𝐍-𝐌𝐃 est en mode privé.",


  OWNER_ONLY:
    (cmd = "") =>
      `☠️ Cette commande est réservée au propriétaire.\nCommande : ${cmd ? "." + cmd : "inconnue"}`,


  ADMIN_ONLY:
    (cmd = "") =>
      `☠️ Cette commande est réservée aux administrateurs du groupe.\nCommande : ${cmd ? "." + cmd : "inconnue"}`

};