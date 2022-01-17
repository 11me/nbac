// Parser service abstracts the xParse

import { HTMLParser, Options, RSSParser } from '@11me/xparse';
import { FetchResult } from '@/models';
import { fetchProvider } from '@/services/helpers';

const rssParser = new RSSParser(fetchProvider);
const htmlParser = new HTMLParser(fetchProvider);

export async function parseSource(url?: string, options?: Options): Promise<FetchResult> {

  if (url) {
    try {
      const res = await rssParser.parse(url);

      return {
        data: {
          name: res[0].creator,
          url: res[0].link,
          source_type: 'rss'
        }
      }
    } catch (e) {

      return {
        err: {
          message: `Could not fetch ${url}`
        }
      }

    }
  } else if (options) {

    try {
      const res = await htmlParser.parse(options)

      return {
        data: {
          name: res[0].creator,
          url: res[0].creator,
          source_type: 'html'
        }
      }
    } catch (e) {

      return {
        err: {
          message: `Could not fetch ${options.description.url}`
        }
      }

    }
  }

  return {
    err: {
      message: `Neither url nor options were given to parse`
    }
  }

}
