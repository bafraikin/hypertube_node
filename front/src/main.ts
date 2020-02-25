import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import VuetifyToast from 'vuetify-toast-snackbar'
import 'vuetify/dist/vuetify.min.css'
import VueI18n from 'vue-i18n'
import messages from './lang'

Vue.use(Vuetify );
Vue.use(VuetifyToast, {
	y: 'top',
	dismissable: false,
	queueable: true,
	showClose: true,
	closeIcon: 'X'
});
Vue.use(VueI18n);

// const messages = {
//   en: {
//     message: {
//       hello: 'hello world'
//     }
//   },
//   ja: {
//     message: {
//       hello: 'こんにちは、世界'
//     }
//   }
// }

const i18n = new VueI18n({
  locale: 'en',
  messages
})

export default new Vuetify({
  theme: {
    dark: true,
  },
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  i18n,
  render: h => h(App)
}).$mount('#app')
