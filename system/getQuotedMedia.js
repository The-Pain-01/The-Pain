export function getQuotedMedia(m) {
  const q = m.quoted?.message;

  if (!q) return null;

  // ===== VIEW ONCE =====
  if (q.viewOnceMessageV2) {
    const msg =
      q.viewOnceMessageV2.message;

    if (msg.imageMessage) {
      return {
        type: "image",
        data: msg.imageMessage,
        fromViewOnce: true
      };
    }

    if (msg.videoMessage) {
      return {
        type: "video",
        data: msg.videoMessage,
        fromViewOnce: true
      };
    }
  }

  // ===== NORMAL =====
  if (q.imageMessage) {
    return {
      type: "image",
      data: q.imageMessage,
      fromViewOnce: false
    };
  }

  if (q.videoMessage) {
    return {
      type: "video",
      data: q.videoMessage,
      fromViewOnce: false
    };
  }

  if (q.stickerMessage) {
    return {
      type: "sticker",
      data: q.stickerMessage,
      fromViewOnce: false
    };
  }

  return null;
}