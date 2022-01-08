<template>
  <div class="nbac_statusbar-container">
    <!--<img class="nbac_statusbar-logo" src="@/assets/nbac_cat.svg" alt="logo">-->
    <ion-icon size="large" src="assets/nbac_cat.svg"></ion-icon>
    <div @click="hadleClick" class="nbac_statusbar-hamburger-menu-container">
      <div ref="hamburgerMenu" class="nbac_statusbar-hamburger-menu-line-container">
        <span class="nbac_statusbar-hamburger-menu-line"></span>
        <span class="nbac_statusbar-hamburger-menu-line"></span>
      </div>
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
      (this.$refs.hamburgerMenu as any).classList.toggle('nbac_statusbar-hamburger-menu-active');
    }
  }
});

</script>

<style>
.nbac_statusbar-container {
  margin: 35px 25px 0 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nbac_statusbar-logo {
  width: 65px;
  height: 50px;
  display: block;
}
.nbac_statusbar-hamburger-menu-container {
  border: 0.5px solid var(--nbac-color-grey);
  border-radius: 13px;
  width: 45px;
  height: 45px;
  cursor: pointer;
}
.nbac_statusbar-hamburger-menu-line-container {
  box-sizing: border-box;
  margin: 35% auto;
  transition: all 0.2s ease-in-out;
}
.nbac_statusbar-hamburger-menu-line {
  width: 20px;
  height: 2px;
  display: block;
  background-color: var(--nbac-color-grey);
  margin: 8px auto;
}
.nbac_statusbar-hamburger-menu-active {
  transform: rotate(-90deg);
}
ion-icon {
  width: 65px;
  height: 50px;
}
</style>
