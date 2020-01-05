import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'

axios.defaults.headers.post["Content-type"] = "application/json";
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
