import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

const store = {
	state: {
		connected: Boolean(false),
		lang: "en",
	},
	mutations: {
		connectUser(state: any, response: any) {
			state.connected = true
			state.user = response.data.user
			state.lang = response.data.user.lang
		},
		disconnectUser(state: any) {
			state.connected = false
			state.user = null
		},
		changeLangState(state: any, lang: string) {
			if (lang == "en"){
				state.lang = "en";
			}
			else{
				state.lang = "fr";
			}
		}
	},
	actions: {
	},
	modules: {
	},
	getters: {
		connected(state: any) {
			return state.connected
		}
	},
	plugins: [vuexLocal.plugin]
}



export default new Vuex.Store(store)
