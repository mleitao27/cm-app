import axios from 'axios'

export default {
  state: {
    clients: null,
    client: null
  },
  mutations: {
    SET_CLIENTS(state, clients) {
      state.clients = clients
    },
    SET_CLIENT(state, client) {
      state.client = client
    }
  },
  actions: {
    fetchClients({ commit }) {
      return axios
        .get(process.env.VUE_APP_SERVER_URL + 'api/clients')
        .then(({ data }) => {
          commit('SET_CLIENTS', data)
          return data
        })
    },
    // eslint-disable-next-line no-empty-pattern
    addClient({}, data) {
      return axios
        .post(process.env.VUE_APP_SERVER_URL + 'api/clients', data)
        .then(({ data }) => {
          return data
        })
    },
    storeClient({ commit }, client) {
      commit('SET_CLIENT', client)
    },
    fetchClient({ commit }, clientId) {
      return axios
        .get(process.env.VUE_APP_SERVER_URL + 'api/clients/' + clientId)
        .then(({ data }) => {
          commit('SET_CLIENT', data)
          return data
        })
    }
  },
  getters: {}
}
