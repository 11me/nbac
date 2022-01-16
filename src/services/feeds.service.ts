import { Options, sources, Feed, RSSParser } from "@11me/xparse";
import { Feed as FeedModel } from '@/models';
import { Http } from '@capacitor-community/http';
import { ref } from "vue";

const feeds = ref<FeedModel[]>([]);

// TODO: make this function generic
async function setFeeds() {
  console.log('set feeds');
}

// TODO: make this function generic and place into helpers
async function fetchProvider(url: string) {
  const resource = await Http.get({url});
  return resource.data;
}

//TODO: make parser composable
const rssParser = new RSSParser(fetchProvider);

async function fetchFeeds(url: string) {
  console.log('fetch feeds');
}

// addFeed adds feeds to database when user updates feeds page
async function addFeed(feed: Feed, src_id: number) {
  console.log('add feeds');
}

async function getFeeds() {
  console.log('get feeds');
}

export function useFeeds() {
  return {
    feeds,
    getFeeds,
    addFeed,
  }
}
