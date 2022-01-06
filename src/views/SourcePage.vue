<template>
  <ion-page style='padding-right:5%; padding-top: 3%'>
    <ion-item>
      <ion-grid>
        <ion-row>
          <ion-col size="10">
            <ion-input type="email" v-model='sourceUrl' placeholder='Correct source'></ion-input>
          </ion-col>
          <ion-col size="2">
            <ion-button @click="addSource">
              <!-- <ion-icon name="arrow-down-circle-outline"></ion-icon> -->
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-item>
    <ion-content :fullscreen="false">
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent,
         IonPage,
         IonLabel,
         IonInput,
         IonCol,
         IonGrid,
         IonRow,
         IonItem,
         IonButton} from '@ionic/vue';
import { defineComponent } from 'vue';
import { Capacitor } from '@capacitor/core';
import Test from '@/types/sources';
import { isRSS } from '@/services/helpers';
import { rocket } from 'ionicons/icons';
import { HTMLParser, sources, Options } from '@11me/xparse';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';


export default defineComponent({
  components: {
    IonContent,
    IonPage,
    IonCol,
    IonGrid,
    IonRow,
    IonItem,
    IonInput,
    IonButton
  },
  data() {
    return {
      sourceUrl: '',
      inDbSources: []
    }
  },
  async created() {
    const platform = Capacitor.getPlatform();
    const sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);

    if(platform === "web") {
      // Create the 'jeep-sqlite' Stencil component
      const jeepSqlite = document.createElement('jeep-sqlite');
      document.body.appendChild(jeepSqlite);
      await customElements.whenDefined('jeep-sqlite');
      // Initialize the Web store
      await sqlite.initWebStore();
    }
    // example: database creation with standard SQLite statements
    const ret = await sqlite.checkConnectionsConsistency();
    const isConn = (await sqlite.isConnection("db_tab3SQLite")).result;
    let db: SQLiteDBConnection
    if (ret.result && isConn) {
      db = await sqlite.retrieveConnection("db_tab3SQLite");
    } else {
      db = await sqlite.createConnection("db_tab3SQLite", false, "no-encryption", 1);
    }
    await db.open();

    const query = `
    CREATE TABLE IF NOT EXISTS test (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL
    );
    `
    const res = await db.execute(query);
    // const change = await db.execute('INSERT INTO test (id, name) VALUES (12, \'sa\')');
    const data = await db.query('SELECT * FROM test');
    await sqlite.closeConnection("db_tab3SQLite");
  },
  methods: {
    addSource() {
      if (isRSS(this.sourceUrl)) {
        console.log('get req')
        console.log('is valid source (check headers)')
        console.log('insert to DB')
      } else {
        console.log('not')
      }
    }
  }
});
</script>

<style scoped>
</style>
