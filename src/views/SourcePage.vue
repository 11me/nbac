<template>
  <ion-page style='padding-right:5%; padding-top: 14%'>
    <h1 style='margin: 0; margin-left: 8%'>Sources</h1>
    <ion-item>
      <ion-grid>
        <ion-row>
          <ion-col size='10'>
            <ion-input type='email' v-model='sourceUrl' placeholder='Source URL'></ion-input>
          </ion-col>
          <ion-col size='2' class='add-source-icon'>
            <ion-icon @click='addSource'
                      size='large'
                      src='assets/icons/arrow-down-circle-outline.svg'>
            </ion-icon>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-item>
    <ion-content :fullscreen='false' class='content'>
      <ion-grid>
        <ion-row class='content'  :key='source.index' v-for='source in initialDbSources'>

          <ion-col size='7' class='source-name-container'>
            <div>
              <p class='source-name'>{{ source.name }}</p>
            </div>
          </ion-col>

          <ion-col size='3' class='source-name-container'>
            <div>
              <ion-toggle @ionChange='changeNotifications($event, source)' :checked='source.notify'></ion-toggle>
            </div>
          </ion-col>

          <ion-col size='2' class='source-name-container'>
            <div class=''>
              <ion-icon size='large'
                        src='assets/icons/close-outline.svg'
                        @click='removeSource(source.id)'>
            </ion-icon>
            </div>
          </ion-col>

        </ion-row>
      </ion-grid>
    </ion-content>
    <p style='margin-left: 8%; margin-top: 15%; margin-bottom: 15%'>Please turn on notifications  in settings</p>
  </ion-page>
</template>

<script lang="ts">
// Vue/Ionic
import {
  IonContent, IonPage, IonLabel, IonInput, IonCol,
  IonGrid, IonIcon, IonRow, IonItem, IonToggle
} from '@ionic/vue';
import { defineComponent } from 'vue';

// NPM
import { RSSParser, sources, Options } from '@11me/xparse';
import { Http } from '@capacitor-community/http';

// inner
import { isRSS } from '@/services/helpers';
import session from '@/main';
import { useFeeds } from '../services/feeds.service';
import { Source } from '../models'

export default defineComponent({
  components: {
    IonContent, IonPage, IonCol, IonIcon,
    IonGrid, IonRow, IonToggle, IonItem, IonInput,
  },
  data() {
    return {
      initialDbSources: [],
      sourceUrl: ''
    }
  },
  setup() {
    const { feeds, getFeeds } = useFeeds();
    return {
      feeds
    }
  },
  async created() {
    this.initialDbSources = await session.selectSource()
  },
  methods: {
    async changeNotifications(change: any, source: Source): Promise<void> {
       if (change.detail.checked) {
         source.notify = 1
         await session.updateSource(source);
       } else {
         source.notify = 0
         await session.updateSource(source);
       }
       this.initialDbSources = await session.selectSource();
    },

    async removeSource(sourceId: number) {
      await session.deleteSource(sourceId);
      this.initialDbSources = await session.selectSource();
    },

    async addSource(): Promise<void> {
      async function fetchProvider(url: string) {
        const resource = await Http.get({url})
        return resource.data
      }
      const rssParser = new RSSParser(fetchProvider);

      let rss = await rssParser.parse({
        description: { 'url': this.sourceUrl, 'page_selector': '' },
        options: {
          title: {
            selectors: ''
          },
          author: {
            selectors: ''
          },
          pubDate: {
            selectors: ''
          },
          content: {
            selectors: ''
          }
        }
      });

      if (isRSS(this.sourceUrl)) {
        let source = {
          id: 1,
          name: rss[0].title[0],
          url: this.sourceUrl,
          last_update: 100000,
          notify: 1,
          state: 1
        }
        await session.insertSource(source);
        this.initialDbSources = await session.selectSource();
      } else {
        console.log('not')
      }
    }
  }
});

</script>

<style scoped>
.add-source-icon {
  text-align: end !important
}
.content {
  padding-left: 6.5% !important
}

.source-name {
  margin: 0
}

.source-name-container {
  align-self: center;
}
</style>
