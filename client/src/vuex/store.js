import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const http = axios.create({
  baseURL: 'http://localhost:3000'
})

const store = new Vuex.Store({
  state: {
    grow: ''
  },
  mutations: {
    setGrow (state, payload) {
      state.grow = payload
    }
  },
  actions: {
    start ({ commit }, user) {
      http.get('/start', user)
      .then(({ data }) => {
        commit('setGrow', data)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
})

export default store
