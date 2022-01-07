<template>
  <ion-page style='padding-right:5%; padding-top: 14%'>
    <h1 style="margin: 0; margin-left: 8%">Sources</h1>
    <ion-item>
      <ion-grid>
        <ion-row>
          <ion-col size="10">
            <ion-input type="email" v-model='sourceUrl' placeholder='Correct source'></ion-input>
          </ion-col>
          <ion-col size="2" class="add-source-icon">
            <ion-icon @click="addSource"
                      size="large"
                      src="assets/icons/arrow-down-circle-outline.svg">
            </ion-icon>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-item>
    <ion-content :fullscreen="false" class='content'>
      <ion-grid>
        <ion-row class='content'  :key="source.index" v-for="source in inDb">

          <ion-col size="7" class="source-name-container">
            <div class="">
              <p class="source-name">{{ source.name }}</p>
            </div>
          </ion-col>

          <ion-col size="3" class="source-name-container">
            <div class="">
              <ion-toggle @ionChange="changeNotifications($event, source.id)" :checked="source.notifications"></ion-toggle>
            </div>
          </ion-col>

          <ion-col size="2" class="source-name-container">
            <div class="">
              <ion-icon size="large"
                        src="assets/icons/close-outline.svg"
                        @click="removeSource(source.id)">
            </ion-icon>
            </div>
          </ion-col>

        </ion-row>
      </ion-grid>
    </ion-content>
    <p style="margin-left: 8%; margin-top: 15%; margin-bottom: 15%">Please turn on notifications  in settings</p>
  </ion-page>
</template>

<script lang="ts">
import { IonContent,
         IonPage,
         IonLabel,
         IonInput,
         IonCol,
         IonGrid,
         IonIcon,
         IonRow,
         IonItem,
         IonToggle} from '@ionic/vue';
import { defineComponent } from 'vue';
  import { isRSS } from '@/services/helpers';
  import { HTMLParser, sources, Options } from '@11me/xparse';

  import session from '@/main';

  export default defineComponent({
    components: {
      IonContent,
      IonPage,
      IonCol,
      IonIcon,
      IonGrid,
      IonRow,
      IonToggle,
      IonItem,
      IonInput,
  },
  data() {
    return {
      inDb: [] as never[],
      sourceUrl: ''
    }
  },
  async created() {
    this.inDb = await session.query('SELECT * FROM trd_sources')
  },
  methods: {
    async changeNotifications(change: any, sourceId: number) {
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
    async addSource() {
      let options = {
        name: 'Bloomberg',
        url: 'vc.ru',
        state: 1,
        notifications: 1,
        last_update: 100000
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
