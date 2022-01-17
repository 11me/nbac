<template>
  <div class="nbac_home-container">
    <div class="nbac_home-title">
      <h1>nbac</h1>
      <h2>all in one news feed</h2>
    </div>
    <div class="nbac_home-content">
      <p>
        You have found a news feed without advertisement
        and personal data usage
      </p>
    </div>
    <div class="nbac_home-content">
      <p>
        Subscribe to web-sites rss feed you want to read
      </p>
    </div>
    <nbac-button linkTo="/sources">Add links</nbac-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NbacButton from '../components/NbacButton.vue';

export default defineComponent({
  components: {
    NbacButton
  }
});
</script>

<style>
.nbac_home-container {
  margin: 150px 30px;
}
.nbac_home-title {
}
.nbac_home-title h1 {
  font-size: 42px;
  line-height: 0.6;
}
.nbac_home-title h2 {
  font-size: 24px;
  line-height: 0.6;
}
.nbac_home-content {
  margin-top: 30px;
  font-size: 17px;
  font-weight: 500;
}
</style>
