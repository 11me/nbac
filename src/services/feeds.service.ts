import { HTMLParser, Options, Feed, sources } from "@11me/xparse";
import { Http } from '@capacitor-community/http';
import { ref } from "vue";

const feeds = ref<Feed[]>();

const debugURL = 'http://70.34.217.128:8888/thehackernews.com'

async function fetchProvider(url: string) {
  const resource = await Http.get({url})
  return resource.data
}

sources.thehackernews.description.url = debugURL;
const htmlParser = new HTMLParser(fetchProvider);

async function getFeeds(options: Options) {
  feeds.value = await htmlParser.parse(options);
}

getFeeds(sources.thehackernews);

export function useFeeds() {
  return {
    feeds,
    getFeeds
  }
}
