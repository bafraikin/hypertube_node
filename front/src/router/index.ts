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
			name: 'Home',
			component: () => import('../../src/components/NewHome.vue'),
				meta: {layout: "layout"}
		},
		{
			path: '/player/:idOMDB/:magnetLink',
			name: 'player-film',
			component: () => import('../views/Film-play.vue'),
				meta: {layout: "layout"}
		},
		{
			path: '/user/:userId',
			name: 'userProfile',
			component: () => import('../views/Profile.vue'),
				meta: {layout: "layout"}
		},
		{
			path: '/movie/:OMDBid',
			name: 'movie',
			component: () => import('../../src/components/MovieDetails.vue'),
				meta: {layout: "layout"}
		},
		{
			path: '/oauth42/callback',
			name: 'oauth42',
			component: () => import('../views/oauth42.vue'),
				meta: {layout: "layout"}
		},
		{
			path: '/oauthGoogle/callback',
			name: 'oauthGoogle',
			component: () => import('../views/oauthGoogle.vue'),
				meta: {layout: "layout"}
		}
	]
})

export default router
