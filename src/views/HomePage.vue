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
    <button class="nbac-button">Add links</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
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
.nbac-button {
  display: block;
  font-size: 16px;
  margin: 50px auto;
  background-color: #fff;
  width: 185px;
  height: 48px;
  border: thin solid #000;
  border-radius: 30px;
}
</style>
