import Vue from 'vue'
import store from './store/index'
import router from './router'
import App from '../vue/App.vue'

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
  render: h => h(App)
})
