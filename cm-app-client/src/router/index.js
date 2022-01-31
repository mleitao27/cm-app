import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Clients from '@/pages/Clients.vue'
import AddClient from '@/pages/AddClient.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/clients',
    name: 'clients',
    component: Clients
  },
  {
    path: '/clients/add',
    name: 'clients-add',
    component: AddClient
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
