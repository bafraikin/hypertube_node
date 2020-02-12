import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../../src/components/layouts/layout.vue'

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
			path: '/film-player/',
			name: 'player-film',
			component: () => import('../views/Film-play.vue'),
			meta: {layout: "layout"}
		},
		{
			path: '/oauth42/callback',
			name: 'oauth42',
			component: () => import('../views/oauth42.vue'),
			meta: {layout: "layout"}
		}
	]
})

export default router
