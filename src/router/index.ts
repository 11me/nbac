import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import FeedsPage from '../views/FeedsPage.vue';
import OnBoard from '../views/OnBoard.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/feeds'
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
    path: '/onboard',
    name: 'OnBoard',
    component: OnBoard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
