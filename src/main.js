import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'

Vue.prototype.$axios = axios;
Vue.prototype.$axios.defaults.headers.post['Content-Type']='application/json;charset=UTF-8'
Vue.config.productionTip = false

import { message,notification } from 'ant-design-vue'
Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
message.config({
    duration: 2,
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
