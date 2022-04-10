import { createStore } from 'vuex'
import clients from '@/store/modules/clients'
import employees from '@/store/modules/employees'
import services from '@/store/modules/services'
import beneficiaries from '@/store/modules/beneficiaries'

export default createStore({
  modules: {
    clients,
    employees,
    services,
    beneficiaries
  }
})
