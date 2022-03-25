import axios from 'axios'

export default {
  state: {
    service: null
  },
  mutations: {
    SET_SERVICE(state, service) {
      state.service = service
    }
  },
  actions: {
    fetchService({ commit }, serviceId) {
      return axios
        .get(process.env.VUE_APP_SERVER_URL + 'api/services/' + serviceId)
        .then(({ data }) => {
          commit('SET_SERVICE', data)
          return data
        })
    },
    // eslint-disable-next-line no-empty-pattern
    addService({}, data) {
      return axios
        .post(process.env.VUE_APP_SERVER_URL + 'api/services', data)
        .then(({ data }) => {
          return data
        })
    },
    updateService({ commit }, newService) {
      return axios
        .put(
          process.env.VUE_APP_SERVER_URL + 'api/services/' + newService._id,
          {
            type: newService.type,
            regime: newService.regime,
            shifts: newService.shifts,
            beginning: newService.beginning,
            duration: newService.duration
          }
        )
        .then(({ data }) => {
          commit('SET_CLIENT', data)
          return data
        })
    },
    // eslint-disable-next-line no-unused-vars
    activateService({ commit }, serviceId) {
      return axios
        .get(
          process.env.VUE_APP_SERVER_URL +
            'api/services/' +
            serviceId +
            '/activate'
        )
        .then(({ data }) => {
          return data
        })
    }
  },
  getters: {}
}
