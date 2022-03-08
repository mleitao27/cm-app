import { createStore } from 'vuex'
import clients from '@/store/modules/clients'
import services from '@/store/modules/services'

export default createStore({
  modules: {
    clients,
    services
  }
})
