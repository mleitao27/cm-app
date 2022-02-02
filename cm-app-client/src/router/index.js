import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Clients from '@/pages/Clients.vue'
import AddClient from '@/pages/AddClient.vue'
import ClientDetails from '@/pages/ClientDetails.vue'

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
  },
  {
    path: '/clients/details/:id',
    name: 'clients-details',
    component: ClientDetails
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
