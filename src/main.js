import Vue from 'vue/dist/vue.esm.js'
import router from './routers.js'
import App from './App.vue'
Vue.component('App', App)

let app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
