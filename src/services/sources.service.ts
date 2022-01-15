// Logic of SourcePage component

import { ref } from 'vue';
import { getSources, insertSource } from '@/services/db.service';
import { parseSource } from '@/services/parser.service';

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
}

async function addSource(url: string) {
  // 1. fetch the source
  const source = await parseSource(url);

  // 2. insert source to db
  const res = await insertSource(source.data);
  if (res.err) {
    //TODO: show alert
    console.log(res.err.message);
    return
  }
  // if no errors
  await setSources();
}

export function useSources() {
  return {
    url,
    sources,
    setSources,
    addSource
  }
}
