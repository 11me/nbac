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
        <ion-row class='content'  :key='source.index' v-for='source in inDb'>

          <ion-col size='7' class='source-name-container'>
            <div>
              <p class='source-name'>{{ source.name }}</p>
            </div>
          </ion-col>

          <ion-col size='3' class='source-name-container'>
            <div>
              <ion-toggle @ionChange='changeNotifications($event, source.id)' :checked='source.notifications'></ion-toggle>
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

export default defineComponent({
  components: {
    IonContent, IonPage, IonCol, IonIcon,
    IonGrid, IonRow, IonToggle, IonItem, IonInput,
  },
  data() {
    return {
      inDb: [] as never[],
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
    this.inDb = await session.query('SELECT * FROM trd_sources')
  },
  methods: {
    async changeNotifications(change: any, sourceId: number): Promise<void> {
       if (change.detail.checked) {
         await session.execute(`UPDATE trd_sources SET notifications=1 WHERE id=${sourceId}`);
       } else {
         await session.execute(`UPDATE trd_sources SET notifications=0 WHERE id=${sourceId}`);
       }
       this.inDb = await session.query('SELECT * FROM trd_sources');
    },

    async removeSource(sourceId: number) {
      await session.execute(`DELETE FROM trd_sources WHERE id=${sourceId}`);
      this.inDb = await session.query('SELECT * FROM trd_sources')
    },

    async addSource(): Promise<void> {
      console.log(this.feeds)
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
      let options = {
        name: rss[0].title[0],
        url: this.sourceUrl,
        state: 1,
        notifications: 1,
        last_update: 10000
      }
      if (isRSS(this.sourceUrl)) {
        let query = `
          INSERT INTO
            trd_sources (name, url, state, notifications, last_update)
          VALUES (
            '${options.name}', '${options.url}', ${options.state},
            ${options.notifications}, ${options.last_update}
          )`
        await session.execute(query);
        this.inDb = await session.query('SELECT * FROM trd_sources');
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
