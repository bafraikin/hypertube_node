import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../../src/components/layouts/layout.vue'
import RouterView from "../components/utils/RouterView.vue";
import { i18n } from "../main";

Vue.use(VueRouter)
Vue.component("layout", Layout)

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: "/:lang",
			component: RouterView,
			beforeEnter(to, from, next){
				const lang = to.params.lang;
				if(!["en", "fr"].includes(lang)){
					return next("en");
				}
				if(i18n.locale !== lang){
					i18n.locale = lang;
				}
				return next();
			},
			children: [
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
				},
				{
					path: '/oauthGoogle/callback',
					name: 'oauthGoogle',
					component: () => import('../views/oauthGoogle.vue'),
    				meta: {layout: "layout"}
				},
    			{
					path: '/user',
					name: 'userProfile',
					component: () => import('../views/Profile.vue'),
					meta: {layout: "layout"}
				},
				{
					path: '/research',
					name: 'researchBar',
					component: () => import('../../src/components/ResearchBar.vue'),
    				meta: {layout: "layout"}
				},
				{
					path: '/',
					name: 'Home',
					component: () => import('../../src/components/NewHome.vue'),
    				meta: {layout: "layout"}
				}
			]
		},
		{
			path: "*",
			redirect: "/en"
		}
		]
})

export default router
