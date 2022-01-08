import { HTMLParser, Options, Feed, sources } from "@11me/xparse";
import { Http } from '@capacitor-community/http';
import { ref } from "vue";
import { Resource } from '../models'

const feeds = ref<Feed[]>();

async function retrieveResourcesFromDB(): Promise<Resource[]> {

  return [
    {
      id: 1,
      guid: 'guid1',
      url: 'https://example.com',
      title: 'News title',
      author: 'Luke',
      pub_date: 'Fri, 11 Dec 2020 18:02:48 -0500',
      content: 'This is some long content of the feed',
      last_update: 'Fri, 11 Dec 2020 18:02:48 -0500',
      notify: true,
      state: true
    },
    {
      id: 2,
      guid: 'guid2',
      url: 'https://example.com',
      title: 'News title 2',
      author: 'Lime',
      pub_date: 'Fri, 11 Dec 2020 18:02:48 -0500',
      content: 'This is some long content of the feed',
      last_update: 'Fri, 11 Dec 2020 18:02:48 -0500',
      notify: true,
      state: true
    },
  ]
}

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
