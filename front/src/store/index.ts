import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

Vue.use(Vuex)

interface DefaultState = {
	connected: Boolean
}

const store: StoreOptions<DefaultState> = {
	state: {
		connected:  false 
	},
	mutations: {
		connectUser(state: StoreOptions<DefaultState>, user: Object) {
			state.connected = true
			state.user = user
		},
		disconnectUser(state) {
			state.connected = false
		}
	},
	actions: {
	},
	modules: {
	},
	getters: {
		doneTodos: state => {
			return state.connected
		}
	}
}



export default new Vuex.Store<DefaultState>(store)
