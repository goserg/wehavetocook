import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '../firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    showSidebar: false,
    recipes: []
  },
  mutations: {
    updateRecipes(state) {
      state.recipes = []
      db.collection('recipes').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          state.recipes.push(doc)
        })
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
