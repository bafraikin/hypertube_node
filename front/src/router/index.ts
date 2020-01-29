import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../../src/components/layouts/layout.vue'

Vue.use(VueRouter)
Vue.component("layout", Layout)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
		meta: {layout: "layout"}
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
	mode: 'history',
  routes
})

export default router
