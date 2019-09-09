import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import './api/axios-interceptors'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

(function () {
  var script = document.createElement('script')
  script.src = '//cdn.jsdelivr.net/npm/eruda'
  document.body.appendChild(script)
  script.onload = function () {
    eruda.init()
  }
})()
