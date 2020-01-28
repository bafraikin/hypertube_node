import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/about',
		name: 'about',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	},
	{
		path: '/film-info',
		name: 'film-info',
		component: () => import('../views/Film-info.vue')
	},
	{
		path: '/film-list',
		name: 'film-list',
		component: () => import('../views/Film-list.vue')
	},
	{
		path: '/download/',
		name: 'film-download',
		component: () => import('../views/Film-download.vue')
	},
	{
		path: '/download/',
		name: 'film-download-seconde',
		component: () => import('../views/Film-download.vue')
	},
	{
		path: '/film-player/',
		name: 'player-film',
		component: () => import('../views/Film-play.vue')
	},
]

const router = new VueRouter({
	routes
})

export default router
