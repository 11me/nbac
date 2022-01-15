// Logic of SourcePage component

import { ref } from 'vue';
import { getSources } from '@/services/db.service';

const url = ref<string>('');
const sources = ref<any[]>([]);

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

export function useSources() {
  return {
    url,
    sources,
    setSources
  }
}
