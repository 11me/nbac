

export function isRSS(url: string): boolean {
  if (url.match(/https?:\/\/.*\.xml$(\?.*)?/)) {
    return true;
  }
  return false;
}
