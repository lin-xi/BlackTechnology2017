import Vue from 'vue/dist/vue.esm.js'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Index from './page/Index.vue'
import Doc from './page/Doc.vue'

export default new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: [
    {name: 'Index', path: '/', component: Index},
    {name: 'Doc', path: '/doc/:name', props: true, component: Doc}
  ]
})