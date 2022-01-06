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
      <p :key="source.index" v-for="source in inDb">{{ source.name }}<ion-toggle></ion-toggle></p>
      <h1>Please turn on notifications  in settings</h1>
    </ion-content>
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
import { Capacitor } from '@capacitor/core';
import Test from '@/types/sources';
import { isRSS } from '@/services/helpers';
import { rocket } from 'ionicons/icons';
import { HTMLParser, sources, Options } from '@11me/xparse';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import inDbSources from '@/services/db';

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
  setup() {
    let sourceUrl = ''

    function addSource() {

      if (isRSS(sourceUrl)) {
        console.log('get req')
        console.log('is valid source (check headers)')
        console.log('insert to DB')
      } else {
        console.log('not')
      }
    }

    let inDb = inDbSources;
    return {
      sourceUrl,
      inDb,
      addSource
    }
  }
});
</script>

<style scoped>
</style>
