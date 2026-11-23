export function getQuotedMedia(m) {
  try {
    const message = m?.message;

    const contextInfo =
      message?.extendedTextMessage?.contextInfo ||
      message?.imageMessage?.contextInfo ||
      message?.videoMessage?.contextInfo ||
      message?.documentMessage?.contextInfo;

    const quoted = contextInfo?.quotedMessage;

    if (!quoted) return null;

    const messageTypes = [
      ["image", "imageMessage"],
      ["video", "videoMessage"],
      ["audio", "audioMessage"],
      ["sticker", "stickerMessage"],
      ["document", "documentMessage"]
    ];

    for (const [type, key] of messageTypes) {
      if (quoted[key]) {
        return {
          type,
          message: quoted[key]
        };
      }
    }

    return null;
  } catch {
    return null;
  }
}
