<template>
  <ion-page>

    <ion-content :fullscreen="true">
      <h1>nbac</h1>
      <ul>
        <li v-for="feed in feeds" :key="feed.title">{{ feed.title }}</li>
        <p>custom text</p>
        <ion-button @click="() => getFeeds(thehackernews)">Get</ion-button>
      </ul>
    </ion-content>

  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonButton } from '@ionic/vue';
import { defineComponent, onMounted } from 'vue';
import { useFeeds } from '../services/feeds.service';
import { sources } from '@11me/xparse';

export default defineComponent({
  components: {
    IonContent,
    IonPage,
    IonButton
  },

  setup() {
    const { feeds, getFeeds } = useFeeds();
    const thehackernews = sources.thehackernews;
    thehackernews.description.url = 'http://70.34.217.128:8888/thehackernews.com';
    return {
      feeds,
      getFeeds,
      thehackernews
    }
  }
});
</script>

<style>
</style>
