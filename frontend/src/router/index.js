import { createRouter, createWebHistory } from 'vue-router'
import Users from '../views/Users.vue'
import UserView from '../views/User.vue'

const routes = [
  {
    path: '/',
    name: 'users',
    component: Users
  },
  {
    path: '/users/:userId',
    name: 'UserView',
    component: UserView
  },
  {
    path: '/users/:userId/book'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
