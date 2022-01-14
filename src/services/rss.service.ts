import { ref } from 'vue';
import { RSSParser } from '@11me/xparse';
import { fetchProvider } from './helpers';
import { Source } from '@/models';
import session from '@/main';

const rssParser = new RSSParser(fetchProvider);

const sources = ref<any[]>([]);
const sourceUrl = ref<string>('');

// setSources updates reactive variable sources value to retrieved values from DB
async function setSources() {
  sources.value = await session.getAllSources()
}
async function fetchSource(url: string): Promise<any[]> {
  const source = await rssParser.parse(url);
  return source;
}

// addSource adds sources to db and update sources to new values
async function addSource(url: string) {
  //FIXME: test url before fetching
  const fetchedSource = await fetchSource(url);

  //FIXME: create mapper function from fetchedSource to source model
  const source = {
    id: 1, // not inserted in db
    name: fetchedSource[0].creator,
    url: url,
    last_update: Date.now(),
    notify: 1,
    state: 1,
    source_type: 'rss'
  }
  await session.insertSource(source);
  await setSources();
  await resetSourceInput();
}

// removeSourceByID removes sources by given id
async function removeSourceByID(id: number) {
  await session.deleteSourceByID(id);
  await setSources();
}

// toggleNotificationState toggles the state of a source
async function toggleNotificationState(event: any, source: Source) {

  if (event.detail.checked) {

    source.notify = 1
    await session.updateSource(source);

  } else {
    source.notify = 0
    await session.updateSource(source);
  }
  await setSources();
}

// export to sourcePage.vue
export function useSources() {
  return {
    sources,
    sourceUrl,
    addSource,
    setSources,
    removeSourceByID,
    toggleNotificationState,
  }
}

async function resetSourceInput() {
  sourceUrl.value = '';
}
