import axios from 'axios'

export default {
  state: {
    employees: null,
    employee: null
  },
  mutations: {
    SET_EMPLOYEES(state, employees) {
      state.employees = employees
    },
    SET_EMPLOYEE(state, employee) {
      state.employee = employee
    }
  },
  actions: {
    fetchEmployees({ commit }) {
      return axios
        .get(process.env.VUE_APP_SERVER_URL + 'api/employees')
        .then(({ data }) => {
          commit('SET_EMPLOYEES', data)
          return data
        })
    },
    // eslint-disable-next-line no-empty-pattern
    addEmployee({}, data) {
      return axios
        .post(process.env.VUE_APP_SERVER_URL + 'api/employees', data)
        .then(({ data }) => {
          return data
        })
    },
    storeEmployee({ commit }, employee) {
      commit('SET_EMPLOYEE', employee)
    },
    fetchEmployee({ commit }, employeeId) {
      return axios
        .get(process.env.VUE_APP_SERVER_URL + 'api/employees/' + employeeId)
        .then(({ data }) => {
          commit('SET_EMPLOYEE', data)
          return data
        })
    },
    updateEmployee({ commit }, newEmployee) {
      return axios
        .put(
          process.env.VUE_APP_SERVER_URL + 'api/employees/' + newEmployee._id,
          {
            name: newEmployee.name,
            address: newEmployee.address,
            fiscalNumber: newEmployee.fiscalNumber
          }
        )
        .then(({ data }) => {
          commit('SET_EMPLOYEE', data)
          return data
        })
    }
  },
  getters: {}
}
