<template>
  <ion-content>
    <status-bar />
    <div class="nbac_feed-container">

      <div class="nbac_feed-short-feeds"></div>

      <div class="nbac_feed-long-feeds">

        <div v-for="feed in feeds" :key="feed.title" class="nbac_feed-one-feed">
          <h2 class="nbac_feed-title">{{ feed.title }}</h2>
          <p>
            {{ feed.content }}
          </p>
          <div class="nbac_feed-one-feed-bar">
            <div><span class="nbac_feed-date">{{ feed.pubDate }}</span><font-awesome-icon icon="paper-plane" /><span></span></div>
            <div>source</div>
          </div>
        </div>

      </div>
    </div>
      <nbac-button @click="() => getFeeds(thehackernews)">Get</nbac-button>
  </ion-content>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useFeeds } from '../services/feeds.service';
import { sources } from '@11me/xparse';
import StatusBar from '../components/StatusBar.vue';
import NbacButton from '../components/NbacButton.vue';
import { IonContent } from '@ionic/vue';

export default defineComponent({
  components: {
    IonContent,
    StatusBar,
    NbacButton,
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
.nbac_feed-container {
  margin: 35px 25px;
}
.nbac_feed-one-feed {

}
.nbac_feed-one-feed h2 {
  font-size: 24px;
  font-weight: bold;
}
.nbac_feed-one-feed p {
  font-size: 17px;
  font-style: normal;
}
.nbac_feed-one-feed-bar {
  display: flex;
  justify-content: space-between;
}
.nbac_feed-date {
  margin-right: 5px;
}
</style>
