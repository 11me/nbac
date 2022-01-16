// Logic of SourcePage component

import { ref } from 'vue';
import { parseSource } from '@/services/parser.service';
import { Err, Source } from '@/models';
import {
  getSources,
  insertSource,
  updateSource
} from '@/services/db.service';

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
  const source = await parseSource(url);

  const res = await insertSource(source.data);
  if (res.err) {
    //TODO: show alert
    console.log(res.err.message);
    return
  }
  // if no errors
  await setSources();
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

export function useSources() {
  return {
    url,
    sources,
    setSources,
    addSource,
    toggleSourceNotification
  }
}

function handleErr(err: Err | undefined) {
  if (err) {
    //TODO: show alert
    console.log(err.message);
    return
  }
}
