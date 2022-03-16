import axios from 'axios'

export default {
  state: {},
  mutations: {},
  actions: {
    // eslint-disable-next-line no-unused-vars
    updateBeneficiary({ commit }, newBeneficiary) {
      return axios
        .put(
          process.env.VUE_APP_SERVER_URL +
            'api/beneficiaries/' +
            newBeneficiary._id,
          {
            name: newBeneficiary.name,
            address: newBeneficiary.address,
            fiscalNumber: newBeneficiary.fiscalNumber
          }
        )
        .then(({ data }) => {
          return data
        })
    },
    // eslint-disable-next-line no-unused-vars
    deleteBeneficiary({ commit }, beneficiaryId) {
      return axios
        .delete(
          process.env.VUE_APP_SERVER_URL + 'api/beneficiaries/' + beneficiaryId
        )
        .then(({ data }) => {
          return data
        })
    }
  },
  getters: {}
}
