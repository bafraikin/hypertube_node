import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

const store = {
	state: {
		connected: Boolean(false)
	},
	mutations: {
		connectUser(state: any, response: any) {
			state.connected = true
			state.user = response.data.user
		},
		disconnectUser(state: any) {
			state.connected = false
			state.user = null
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
