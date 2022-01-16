import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import SourcePage from '../views/SourcePage.vue';
import FeedsPage from '../views/FeedsPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/feeds',
    name: 'Feeds',
    component: FeedsPage
  },
  {
    path: '/sources',
    name: 'SourcePage',
    component: SourcePage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
