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
      console.log('USER', request.data)
      return request.data
    }
  },
  modules: {

  }
})
