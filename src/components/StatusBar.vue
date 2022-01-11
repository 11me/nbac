<template>
  <div class="nbac_statusbar-container">
    <!--<img class="nbac_statusbar-logo" src="@/assets/nbac_cat.svg" alt="logo">-->
    <ion-icon size="large" src="assets/nbac_cat.svg"></ion-icon>
    <div @click="hadleClick" class="nbac_statusbar-hamburger-menu-container">
      <div ref="menu" class="nbac_statusbar-hamburger-menu-line-box"></div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { IonIcon } from '@ionic/vue';

export default defineComponent({
  name: 'StatusBar',
  components: {
  //  IonToolbar,
    IonIcon
  },
  methods: {
    hadleClick: function(e: any) {
      e.stopPropagation();
      (this.$refs.menu as any).classList.toggle('nbac_statusbar-menu-rotate');
    }
  }
});

</script>

<style>
.nbac_statusbar-container {
  margin: 26px 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nbac_statusbar-logo {
  width: 50rem;
  height: 45rem;
  display: block;
}
.nbac_statusbar-hamburger-menu-container {
  border: thin solid var(--nbac-color-grey);
  border-radius: 13px;
  width: 45px;
  height: 45px;
  cursor: pointer;
}
.nbac_statusbar-hamburger-menu-line-box {
  border-top: thin solid var(--nbac-color-grey);
  border-bottom: thin solid var(--nbac-color-grey);
  width: 24px;
  height: 16px;
  margin: 12px auto;
  transform: rotate(90deg);
  transition: all 0.2s ease-in-out;
}
.nbac_statusbar-menu-rotate {
  transform: rotate(180deg);
}
ion-icon {
  width: 4rem;
  height: 3rem;
}
</style>
