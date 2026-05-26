export function getQuotedMedia(m) {

  const q =
    m?.quoted?.message;

  if (!q) return null;

  if (q.imageMessage) {
    return {
      type: 'image',
      data: q.imageMessage
    };
  }

  if (q.videoMessage) {
    return {
      type: 'video',
      data: q.videoMessage
    };
  }

  if (q.stickerMessage) {
    return {
      type: 'sticker',
      data: q.stickerMessage
    };
  }

  return null;
}