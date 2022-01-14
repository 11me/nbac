import session from "@/main";
import { Options, sources, Feed, RSSParser } from "@11me/xparse";
import { Feed as FeedModel } from '@/models';
import { Http } from '@capacitor-community/http';
import { ref } from "vue";

const feeds = ref<FeedModel[]>([]);

// TODO: make this function generic
async function setFeeds() {
  feeds.value = await session.getAllFeeds();
}

// TODO: make this function generic and place into helpers
async function fetchProvider(url: string) {
  const resource = await Http.get({url});
  return resource.data;
}

//TODO: make parser composable
const rssParser = new RSSParser(fetchProvider);

async function fetchFeeds(url: string): Promise<Feed[]> {
  const feeds = await rssParser.parse(url);
  return feeds;
}

// addFeed adds feeds to database when user updates feeds page
async function addFeed(feed: Feed, src_id: number) {

  const constructedFeed = {
    id: 0,
    guid: 'random',
    title: feed.title,
    author: feed.author,
    pub_date: feed.pubDate,
    content: feed.description,
    source_id: src_id,
    seen: 0
  }
    await session.insertFeed(constructedFeed, src_id);
    await setFeeds();
}

async function getFeeds() {
  // retrieve all sources from DB
  const sources = await session.getAllSources();

  // for each source retrieve the feed
  sources.forEach(async source => {
    // fetch feeds
     const fetchedFeeds = await fetchFeeds(source.url);
    // insert feed to db
    fetchedFeeds.forEach(async feed => {
      await addFeed(feed, source.id)
    });
  });
}

export function useFeeds() {
  return {
    feeds,
    getFeeds,
    addFeed,
  }
}
