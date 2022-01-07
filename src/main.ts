import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/nbac.css';
import { defineCustomElements as jeepSqlite, applyPolyfills} from 'jeep-sqlite/loader'
import SQLiteSession from '@/services/session';

applyPolyfills().then(() => {
    jeepSqlite(window);
});

const session = new SQLiteSession('db_tab3SQLite')

session.execute(`
  CREATE TABLE IF NOT EXISTS trd_sources (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    state INTEGER NOT NULL,
    notifications INTEGER NOT NULL,
    last_update INTEGER NOT NULL
);`)

export default session

const app = createApp(App)
  .use(IonicVue)
  .use(router);



router.isReady().then(() => {
  app.mount('#app');
});
