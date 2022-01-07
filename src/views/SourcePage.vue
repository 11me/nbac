<template>
  <ion-page style='padding-right:5%; padding-top: 3%'>
    <ion-item>
      <ion-grid>
        <ion-row>
          <ion-col size="10">
            <ion-input type="email" v-model='sourceUrl' placeholder='Correct source'></ion-input>
          </ion-col>
          <ion-col size="2">
            <ion-button @click="addSource">
              <!-- <ion-icon name="arrow-down-circle-outline"></ion-icon> -->
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-item>
    <ion-content :fullscreen="false">
      <p :key="source.index" v-for="source in inDb">
        {{ source.name }}
        <ion-toggle :checked="source.notifications"></ion-toggle>
      </p>
    </ion-content>
    <h1>Please turn on notifications  in settings</h1>
  </ion-page>
</template>

<script lang="ts">
import { IonContent,
         IonPage,
         IonLabel,
         IonInput,
         IonCol,
         IonGrid,
         IonRow,
         IonItem,
         IonToggle,
         IonButton} from '@ionic/vue';
import { defineComponent } from 'vue';
import { isRSS } from '@/services/helpers';
import { rocket } from 'ionicons/icons';
import { HTMLParser, sources, Options } from '@11me/xparse';

import session from '@/main';

export default defineComponent({
  components: {
    IonContent,
    IonPage,
    IonCol,
    IonGrid,
    IonRow,
    IonToggle,
    IonItem,
    IonInput,
    IonButton
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

    async addSource() {
      let options = {
        name: 'vcru',
        url: 'vc.ru',
        state: 1,
        notifications: 0,
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
</style>
