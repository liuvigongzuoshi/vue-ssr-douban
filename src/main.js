// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import myUtils from './util/util'

Vue.config.productionTip = false
Vue.prototype.myUtils = myUtils

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
