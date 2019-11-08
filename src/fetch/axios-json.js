import axios from 'axios'
import Vue from 'vue';
import qs from 'qs';

// 创建vue实例
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_PREFIX, // api的base_url
    timeout: 10000 // request timeout
})
  // 添加请求拦截器
instance.interceptors.request.use(config => {
    // config.headers['Content-Type'] = "application/x-www-form-urlencoded;charset=utf-8"
    // let  data = config.data;
    // if (config.method !== 'get') {
    //   if (data && !(data instanceof FormData)) {
    //     config.data = qs.stringify(data);
    //   }
    // }
    return config
}, 
error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})
//添加响应拦截器
instance.interceptors.response.use(
    res => {
      if (res.data.code !== '200') {
      }
      return res;
    },
    err => {
      return Promise.reject(err)
    })

    
let $get = (url, params) => {
    return instance({
      url,
      method: 'get',
      params
    })
}
  
let $post = (url, data) => {
    return instance({
      url,
      method: 'post',
      data
    })
}
  
Vue.prototype.$httpJson = instance
Vue.prototype.$getJson = $get
Vue.prototype.$postJson = $post
  
export default {
    $get,
    $post,
}