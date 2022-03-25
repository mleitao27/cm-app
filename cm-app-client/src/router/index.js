import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Clients from '@/pages/clients/Clients.vue'
import AddClient from '@/pages/clients/AddClient.vue'
import ClientDetails from '@/pages/clients/ClientDetails.vue'
import EditClient from '@/pages/clients/EditClient.vue'
import EditBeneficiaries from '@/pages/beneficiaries/EditBeneficiaries.vue'
import EditService from '@/pages/services/EditService.vue'
import ServiceHistory from '@/pages/services/ServiceHistory.vue'

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
  },
  {
    path: '/clients/edit/:id',
    name: 'clients-edit',
    component: EditClient
  },
  {
    path: '/clients/edit/:id/beneficiaries',
    name: 'clients-edit-beneficiaries',
    component: EditBeneficiaries
  },
  {
    path: '/services/edit/:id',
    name: 'services-edit',
    component: EditService
  },
  {
    path: '/clients/:id/service-history',
    name: 'clients-service-history',
    component: ServiceHistory
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
