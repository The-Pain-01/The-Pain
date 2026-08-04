export function getQuotedMedia(m) {

  const quoted =
    m?.quoted?.message;


  if (!quoted)
    return null;



  const msg =
    quoted.ephemeralMessage?.message ||
    quoted.viewOnceMessage?.message ||
    quoted;



  if (msg.imageMessage)
    return {
      type: "image",
      message: msg.imageMessage
    };


  if (msg.videoMessage)
    return {
      type: "video",
      message: msg.videoMessage
    };


  if (msg.stickerMessage)
    return {
      type: "sticker",
      message: msg.stickerMessage
    };


  if (msg.documentMessage)
    return {
      type: "document",
      message: msg.documentMessage
    };


  return null;

}