<template>
  <ion-content>
    <status-bar />
    <div class="nbac_feed-container">

      <div class="nbac_feed-short-feeds">
        <div class="nbac_feed-short-one-feed">
          <h2>The Hacker News</h2>
          <p><span class="nbac_feed-short-time">14:15</span>News title one with long title</p>
          <p><span class="nbac_feed-short-time">14:15</span>News title two with long title</p>
          <p><span class="nbac_feed-short-time">14:15</span>News title three with long title</p>
        </div>
        <div class="nbac_feed-short-one-feed">
          <h2>vc.ru</h2>
          <p><span class="nbac_feed-short-time">14:15</span>Feed from vc 1 with long title</p>
          <p><span class="nbac_feed-short-time">14:15</span>Feed from vc 2 with long title</p>
        </div>
      </div>

      <div class="nbac_feed-long-feeds">

        <div v-for="feed in feeds" :key="feed.title" class="nbac_feed-one-feed">
          <h2 class="nbac_feed-title">{{ feed.title }}</h2>
          <p>
            {{ truncate(feed.description, 300) }}
          </p>
          <div class="nbac_feed-one-feed-bar">
            <div><span class="nbac_feed-date">{{ formatDate(feed.pubDate) }}</span><font-awesome-icon icon="paper-plane" /><span></span></div>
            <div><a :href="feed.link">{{ feed.creator }}</a></div>
          </div>
        </div>

      </div>
    </div>
      <nbac-button @click="() => getFeeds(thehackernews)">Get</nbac-button>
  </ion-content>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useFeeds } from '../services/feeds.service';
import { sources } from '@11me/xparse';
import StatusBar from '../components/StatusBar.vue';
import NbacButton from '../components/NbacButton.vue';
import { IonContent } from '@ionic/vue';
import moment from 'moment';

export default defineComponent({
  components: {
    IonContent,
    StatusBar,
    NbacButton
  },
  setup(props, context) {
    const { feeds, getFeeds } = useFeeds();
    const thehackernews = sources.thehackernews;

    thehackernews.description.url = 'http://70.34.217.128:8888/thehackernews.com';
    getFeeds(thehackernews);

    function truncate(content: string, len: number): string {
      return `${content.substring(0, len)} ...`;
    }
    function formatDate(d: string): string {
      const m = moment(d).format('DD.MM.YY');
      return m;
    }

    return {
      feeds,
      getFeeds,
      thehackernews,
      truncate,
      formatDate,
    }
  },
});
</script>

<style>
/** short content style */
.nbac_feed-short-feeds {
}

.nbac_feed-short-one-feed {

}

.nbac_feed-short-one-feed h2 {
  font-size: 18px;
  font-weight: 500;
}

.nbac_feed-short-one-feed .nbac_feed-short-time {
  margin-right: 10px;
  color: var(--nbac-color-grey);
}

.nbac_feed-short-one-feed p {
  font-size: 17px;
  margin-top: 8px;
  margin-bottom: 8px;
}

/** long content style */
.nbac_feed-container {
  margin: 35px 25px;
}
.nbac_feed-long-feeds {
}

.nbac_feed-one-feed {
  margin-top: 30px;
}
.nbac_feed-one-feed h2 {
  font-size: 24px;
  font-weight: bold;
}
.nbac_feed-one-feed p {
  font-size: 17px;
  font-style: normal;
  margin-bottom: 25px;
}
.nbac_feed-one-feed-bar {
  display: flex;
  justify-content: space-between;
}
.nbac_feed-date {
  margin-right: 15px;
}
</style>
