import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../../src/components/layouts/layout.vue'
import FilmList from '../../src/views/Film-list.vue'

Vue.use(VueRouter)
Vue.component("layout", Layout)


const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			meta: {layout: "layout"}
		},
		{
			path: '/film-info',
			name: 'film-info',
			component: () => import('../views/Film-info.vue')
		},
		{
			path: '/film-list',
			name: 'film_list',
			component: FilmList,
			meta: {layout: "layout"}   //je sais pas a quoi cela correspond
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
})


export default router
