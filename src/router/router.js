import Vue from 'vue'
import Router from 'vue-router'

import Main from '../components/Main'
import RecipeEditor from '../components/RecipeEditor'
import DetailedView from '../components/DetailedView'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/editor',
      name: 'editor',
      component: RecipeEditor,
      props: true
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