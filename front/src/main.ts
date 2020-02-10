import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import VuetifyToast from 'vuetify-toast-snackbar'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);
Vue.use(VuetifyToast, {
	y: 'top',
	dismissable: false,
	queueable: true,
	showClose: true,
	closeIcon: 'X'
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
	vuetify: new Vuetify(),
  render: h => h(App)
}).$mount('#app')
