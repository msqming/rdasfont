import axios from 'axios'
import Vue from 'vue';
import qs from 'qs';
import CryptoJS from 'crypto-js'

// 创建vue实例
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_PREFIX, // api的base_url
    timeout: 8000 // request timeout
})

// 添加请求拦截器
instance.interceptors.request.use(config => {
        // console.log(config)
        //  aes加密
        var key = CryptoJS.enc.Utf8.parse("8NONwyJtHesysWpM"); // 固定密串iv
        var time = (new Date()).getTime(); // 当前时间戳
        var user_id = '1'; // 用户id
        var session_key = '981EF4F290B6F60B16F25A0CF381FFB1'; // 暂时用固定
        var plaintText = 'user_id=' + user_id + '&session_key=' + session_key + '&time=' + time
        var encryptedData = CryptoJS.AES.encrypt(plaintText, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        console.log("加密前：" + plaintText); // 打印测试数据(加密前字符串)
        console.log("加密后：" + encryptedData); // 打印测试数据(加密后字符串)

        config.headers['Content-Type'] = "application/x-www-form-urlencoded;charset=utf-8"
        config.headers['sign'] = plaintText
        config.headers['version'] = "v1"
            // console.log(config);
        let data = config.data || config.params;
        let headerParam = ['userId', 'token']; // 从数据从提升到header头里
        if (data) {
            for (let i of headerParam) {
                if (data[i]) {
                    config.headers[i] = data[i]
                    delete data[i]
                }
            }
        }

        if (config.method !== 'get') {
            if (data && !(data instanceof FormData)) {
                config.data = qs.stringify(data);
            }
        }
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
        if (res.data.code !== '200') {}
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

Vue.prototype.$http = instance
Vue.prototype.$get = $get
Vue.prototype.$post = $post

export default {
    $get,
    $post,
}