export function getQuotedMedia(m) {

  const quoted =
    m?.quoted?.message;

  if (!quoted)
    return null;

  if (quoted.imageMessage)
    return {
      type: 'image'
    };

  if (quoted.videoMessage)
    return {
      type: 'video'
    };

  if (quoted.stickerMessage)
    return {
      type: 'sticker'
    };

  return null;
}