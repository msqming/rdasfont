import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from "qs"
import './fetch/axios' // 引入网络请求库
import './fetch/axios-json' // 引入网络请求库
import {_local} from './common/utils/storage'


import './common/css/common.css'
Vue.use(ElementUI);

Vue.prototype.$axios = axios
Vue.prototype.$local = _local
Vue.config.productionTip = false
// axios.defaults.timeout = 5000 // 请求超时
// axios.defaults.baseURL = '/api'
axios.defaults.baseURL = 'http://19.87.12.184:8000/' // api 即上面 vue.config.js 中配置的地址
// axios.defaults.baseURL = 'http://xcx.ap-edu.club/' // api 即上面 vue.config.js 中配置的地址

// 路由守卫
router.beforeEach((to, from, next) => {
  let that = this;
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title || '儒韵BI数据分析系统'
  }
  if(to.path=='/Login'){
    next()
  }else{
    if(_local.get('userInfo')){
      next()
    }else{
      next({path:'/Login',query:to.path})
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
