import Vue from 'vue'
import App from './App.vue'

import './styles.css'
import './assets/variables.css'

import router from './router/router'

import { firestorePlugin } from 'vuefire'
import store from './store'

Vue.use(firestorePlugin)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

