import { Http } from '@capacitor-community/http';

export async function fetchProvider(url: string) {
  const resource = await Http.get({url})
  return resource.data
}

export function isRSS(url: string): boolean {
  if (url.match(/https?:\/\/.*\.xml$(\?.*)?/)) {
    return true;
  }
  return false;
}
