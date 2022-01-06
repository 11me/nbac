<template>
  <ion-page>

    <ion-content :fullscreen="true">
      <h1>nbac</h1>
      <ul>
        <li v-for="feed in feeds" :key="feed.title">{{ feed.title }}</li>
      </ul>
    </ion-content>

  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent, onMounted } from 'vue';
import { useFeeds } from '../services/feeds.service';

export default defineComponent({
  components: {
    IonContent,
    IonPage
  },

  setup() {
    const { feeds, getFeeds } = useFeeds();
    return {
      feeds
    }
  }
});
</script>

<style>
</style>
