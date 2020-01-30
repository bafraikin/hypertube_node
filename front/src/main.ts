import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
//import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader

Vue.use(Vuetify) ;
Vue.config.productionTip = false

// export default new Vuetify({
//   icons: {
//     iconfont: 'fa',
//   },
// })


new Vue({
  router,
  store,
	vuetify: new Vuetify(),
  render: h => h(App)
}).$mount('#app')
