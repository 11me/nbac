<template>
  <ion-toolbar>
    <div class="nbac_statusbar-container">
      <img class="nbac_statusbar-logo" src="@/assets/nbac_cat.png" alt="logo">
    </div>
  </ion-toolbar>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { IonToolbar } from '@ionic/vue';

export default defineComponent({
  name: 'StatusBar',
  components: {
    IonToolbar,
  }
});

</script>

<style>
.nbac_statusbar-container {
  margin: 30px 20px;
  border: 1px solid black;
}
.nbac_statusbar-logo {
  width: 65px;
  height: 50px;
  display: block;
}
</style>
