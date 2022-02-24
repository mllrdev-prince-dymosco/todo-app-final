import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import InteractiveBoard from '../views/InteractiveBoard.vue'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/InteractiveBoard',
    name: 'InteractiveBoard',
    component: InteractiveBoard
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
