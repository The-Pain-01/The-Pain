
export function runtime(seconds) {
  seconds = Number(seconds);

  if (!Number.isFinite(seconds) || seconds < 0) {
    seconds = 0;
  }

  seconds = Math.floor(seconds);

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return [
    days ? `${days}d` : "",
    hours ? `${hours}h` : "",
    minutes ? `${minutes}m` : "",
    `${secs}s`
  ]
    .filter(Boolean)
    .join(" ");
}

export function formatNumber(number) {
  return String(number ?? "").replace(/\D/g, "");
}

export function sleep(ms) {
  ms = Number(ms);

  if (!Number.isFinite(ms) || ms < 0) {
    ms = 0;
  }

  return new Promise(resolve => setTimeout(resolve, ms));
}
