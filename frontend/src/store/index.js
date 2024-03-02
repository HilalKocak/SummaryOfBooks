import { createStore } from 'vuex'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async fetchUsers() {
      const request = await axios.get('/users')
      return request.data
    },
    async fetchUser({ state }, userId) {
      const request = await axios.get(`/users/${userId}`)
      return request.data
    },
    async getGenres({ state }, userId){
      const request = await axios.get(`/users/${userId}/genres`)
      return request.data
    }

  },
  modules: {

  }
})
