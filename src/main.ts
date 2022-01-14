import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* fontawesome icons */
import { library as faIcons } from '@fortawesome/fontawesome-svg-core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

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

import { defineCustomElements as jeepSqlite, applyPolyfills} from 'jeep-sqlite/loader';
import SQLiteSession from '@/services/session';

applyPolyfills().then(() => {
    jeepSqlite(window);
});

const session = new SQLiteSession('db_tab3SQLite');

session.createTables()

export default session

/* register fa-icons */
faIcons.add(faPaperPlane);

const app = createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(IonicVue)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});
