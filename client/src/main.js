import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import './init'
import vuetify from './plugins/vuetify'
import router from './routes'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App),
  store: store
}).$mount('#app')
