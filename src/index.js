import Vue from 'vue/dist/vue.esm.browser'
import VueRouter from 'vue-router'
import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css'

import routes from './routes'
import Main from './index.vue'

Vue.use(VueRouter)
Vue.use(Vuesax)

const router = new VueRouter({
  mode: 'history',
  routes
})

router.push('/one')

new Vue({
  router,
  render: h => h(Main)
}).$mount('#app')
