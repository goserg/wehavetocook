import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '../firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    showSidebar: false,
    recipes: [],
    loading: false
  },
  mutations: {
    updateRecipes(state) {
      state.recipes = []
      state.loading = true
      db.collection('recipes').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          state.recipes.push(doc)
        })
        state.loading = false
      })
    },
    setUser(state, user) {
      state.user = user
    },
    switchSidebar(state) {
      if (state.showSidebar) {
        state.showSidebar = false
        document.querySelector('body').style.overflowY = 'auto'
      } else {
        state.showSidebar = true
        document.querySelector('body').style.overflowY = 'hidden'
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
