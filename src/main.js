import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Dropdown from 'vue-simple-search-dropdown';
Vue.config.productionTip = false

new Vue({
  store,
  Dropdown,
  render: function (h) { return h(App) }
}).$mount('#app')
