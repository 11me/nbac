import { HTMLParser, Options, sources, Feed } from "@11me/xparse";
import { Http } from '@capacitor-community/http';
import { ref } from "vue";

const feeds = ref<Feed[]>();

async function fetchProvider(url: string) {
  const resource = await Http.get({url})
  return resource.data
}

// NOTE: this is for debugging purpose
const debugURL = 'http://70.34.217.128:8888/thehackernews.com'
sources.thehackernews.description.url = debugURL;

const htmlParser = new HTMLParser(fetchProvider);

async function getFeeds(options: Options) {
  feeds.value = await htmlParser.parse(options);
}

export function useFeeds() {
  return {
    feeds,
    getFeeds
  }
}
