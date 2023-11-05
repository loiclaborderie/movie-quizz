import { createRouter, createWebHistory } from 'vue-router'
import GuessTheMovie from '@/components/GuessTheMovie.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Movies',
      component: GuessTheMovie
    }
  ]
})

export default router
