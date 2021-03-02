import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'

import { Swipe, SwipeItem, Tab, Tabs, NavBar, Icon, Cell, CellGroup, Sticky, Search } from 'vant';

Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(NavBar)
Vue.use(Icon)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Sticky)
Vue.use(Search)

Vue.prototype.$axios = axios; // 把当前的axios对象 挂载Vue的原型上 这样一来 

import { VueJsonp } from "vue-jsonp";

Vue.use(VueJsonp)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
