import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../../src/components/layouts/layout.vue'
import FilmList from '../../src/views/Film-list.vue'
import FilmDownload from '../../src/views/Film-download.vue'

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
			component: FilmDownload,
			meta: {layout: "layout"}   //je sais pas a quoi cela correspond
		},
		{
			path: '/film-player/',
			name: 'player-film',
			component: () => import('../views/Film-play.vue')
		},
	]
})


export default router
