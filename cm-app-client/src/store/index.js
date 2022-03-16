import { createStore } from 'vuex'
import clients from '@/store/modules/clients'
import services from '@/store/modules/services'
import beneficiaries from '@/store/modules/beneficiaries'

export default createStore({
  modules: {
    clients,
    services,
    beneficiaries
  }
})
