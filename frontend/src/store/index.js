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
    },
    async getBooks({ state }, userId){
      const request = await axios.get(`/users/${userId}/books`)
      return request.data
    },
    async addGenre({ state },  { userId, newGenre }) {
      const response = await axios.post(`/users/${userId}/genre`, {
        name: newGenre, user: userId
      })
      return response.data
    },
    async addBook({ state },  { userId, title, author, genreId }) {
      const response = await axios.post(`/users/${userId}/book`, {
        name : title,
        author,
        genreId: genreId
      })
      return response.data
    },
    async addPost({ state },  { userId, bookId, quote }) {
      const response = await axios.post(`/users/${userId}/post`, {
        quote : quote,
        bookId: bookId
      })
      return response.data
    },
    async getQuotes({ state }, {userId, bookId}){
      const request = await axios.get(`/users/${userId}/book/${bookId}/posts`)
      return request.data
    },
    async getBook({state}, bookId){
      const request = await axios.get(`/books/${bookId}`)
      return request.data
    }

  },
  modules: {

  }
})
