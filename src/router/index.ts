import { createRouter, createWebHistory } from 'vue-router'
import MovieTest from '@/components/MovieTest.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Movies',
      component: MovieTest
    }
  ]
})

export default router
