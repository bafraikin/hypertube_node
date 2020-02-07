import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = {
	state: {
		connected: Boolean(false)
	},
	mutations: {
		connectUser(state: any, user: Object) {
			state.connected = true
			state.user = user
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
	}
}



export default new Vuex.Store(store)
