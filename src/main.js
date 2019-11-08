import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from "qs"
import './fetch/axios' // 引入网络请求库
import './fetch/axios-json' // 引入网络请求库


import './common/css/common.css'
Vue.use(ElementUI);

Vue.prototype.$axios = axios
Vue.config.productionTip = false
// axios.defaults.timeout = 5000 // 请求超时
// axios.defaults.baseURL = '/api'
axios.defaults.baseURL = 'http://localhost:8000/' // api 即上面 vue.config.js 中配置的地址
// axios.defaults.baseURL = 'http://xcx.ap-edu.club/' // api 即上面 vue.config.js 中配置的地址

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
