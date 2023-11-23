export function encodeRelayURL(url: string): string {
  url = url.trim();
  if (url.startsWith("wss://")) {
    url = url.slice(6);
  }
  return encodeURIComponent(url);
}
