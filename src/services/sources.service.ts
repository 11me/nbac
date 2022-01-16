// Logic of SourcePage component

import { ref } from 'vue';
import { parseSource } from '@/services/parser.service';
import { Err, Source, FetchResult } from '@/models';
import {
  getSources,
  insertSource,
  updateSource,
  deleteSource
} from '@/services/db.service';

// user input url
const url = ref<string>('');
const sources = ref<any[]>([]);

// setSources retrieves the sources from DB
// and updates the reactive sources variable.
async function setSources() {
  const res = await getSources();
  // check errors
  if (res.err) {
    //TODO: show alert message
    return
  }
  if (res.data) {
    sources.value = res.data;
  }
  // clean up url input
  url.value = '';
}

async function addSource(url: string) {

  if (url) {

    const source = await parseSource(url);

    if (source.err) {
      //TODO: show alert
      console.log(source.err.message);
      return
    }

    const res = await insertSource({
      ...source.data,
      url //override url to user input url
    });

    if (res.err) {
      //TODO: show alert
      console.log(res.err.message);
      return
    }
    // if no errors
    await setSources();
  }
}

async function toggleSourceNotification(src: Source) {
  const srcUpdate = {
    ...src,
    notify: src.notify === 0 ? 1 : 0
  }
  const res = await updateSource(srcUpdate);

  if (res.err) {
    //TODO: show alert
    console.log(res.err.message);
  }
  // if no errors
  await setSources();

}

async function removeSource(source: Source) {
  const res = await deleteSource(source);

  if (res.err) {
    //TODO: show alert
    console.log(res.err.message);
    return
  }
  await setSources();
}

export function useSources() {
  return {
    url,
    sources,
    setSources,
    addSource,
    toggleSourceNotification,
    removeSource
  }
}

function handleErr(err: Err | undefined) {
  if (err) {
    //TODO: show alert
    console.log(err.message);
    return
  }
}
