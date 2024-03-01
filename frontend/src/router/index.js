import { createRouter, createWebHistory } from 'vue-router'
import Users from '../views/Users.vue'

const routes = [
  {
    path: '/',
    name: 'users',
    component: Users
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
