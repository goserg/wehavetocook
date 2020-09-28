import Vue from 'vue'
import Router from 'vue-router'

import Main from '../components/Main'
import NewRecipe from '../components/NewRecipe'
import DetailedView from '../components/DetailedView'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/new',
      name: 'new',
      component: NewRecipe
    },
    {
      path: '/recipe',
      name: 'recipe',
      component: DetailedView,
      props: true
    }
  ]
})

export default router