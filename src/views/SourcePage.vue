<template>
  <ion-page style='padding-right:5%; padding-top: 14%'>
    <h1 style='margin: 0; margin-left: 8%'>Sources</h1>
    <ion-item>
      <ion-grid>
        <ion-row>
          <ion-col size='10'>
            <ion-input type='url' v-model='url' placeholder='Source URL'></ion-input>
          </ion-col>
          <ion-col size='2' class='add-source-icon'>
            <ion-icon @click='addSource(url)'
                      size='large'
                      src='assets/icons/arrow-down-circle-outline.svg'>
            </ion-icon>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-item>
    <ion-content :fullscreen='false' class='content'>
      <ion-grid>
        <ion-row class='content'  :key='source.id' v-for='source in sources'>

          <ion-col size='7' class='source-name-container'>
            <div>
              <p class='source-name'>{{ source.name }}</p>
            </div>
          </ion-col>

          <ion-col size='3' class='source-name-container'>
            <div>
              <ion-toggle @ionChange='dummyPlug("toggle")' :checked='source.notify'></ion-toggle>
            </div>
          </ion-col>

          <ion-col size='2' class='source-name-container'>
            <div class=''>
              <ion-icon size='large'
                        src='assets/icons/close-outline.svg'
                        @click='dummyPlug("remove")'>
            </ion-icon>
            </div>
          </ion-col>

        </ion-row>
      </ion-grid>
    </ion-content>
    <p style='margin-left: 8%; margin-top: 15%; margin-bottom: 15%'>Please turn on notifications  in settings</p>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  IonContent,
  IonPage,
  IonLabel,
  IonInput,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonItem,
  IonToggle
} from '@ionic/vue';

import { useSources } from '@/services/sources.service';

export default defineComponent({
  components: {
    IonContent,
    IonPage,
    IonCol,
    IonIcon,
    IonGrid,
    IonRow,
    IonToggle,
    IonItem,
    IonInput,
  },

  setup() {

    const { url, sources, setSources, addSource } = useSources();

    //TODO: delete me
    const dummyPlug = (msg: string) => console.log(msg);

    // call set sources to update them when created
    setSources();

    return {
      url,
      sources,
      setSources,
      addSource,
      dummyPlug
    }
  },
});

</script>

<style scoped>
.add-source-icon {
  text-align: end !important
}
.content {
  padding-left: 6.5% !important
}

.source-name {
  margin: 0
}

.source-name-container {
  align-self: center;
}
</style>
