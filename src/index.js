import Vue from 'vue/dist/vue.esm.js'
import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css'

import Main from './layouts/default.vue'

Vue.use(Vuesax)

new Vue({
  render: h => h(Main)
}).$mount('#app')
