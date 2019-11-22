import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

var router = new Router({
  routes:[{
    path: '/',
    redirect: '/Login',
  },{
    path: '/Login',
    name: 'Login',
    component: () =>
      import ('views/login/Login.vue'),
    meta: {
      title: '登录'
    }
  },
    {
    path: '/home',
    name: 'Home',
    component: () =>
      import ('views/home/Home.vue'),
    meta: {
      title: '首页'
    }
  },{
    path: '/manageAPI',
    name: 'ManageAPI',
    component: () =>
      import ('views/manageAPI/ManageAPI.vue'),
    meta: {
      title: '接口管理'
    },beforeEnter:(to,from,next)=>{
      // 判断是否是超级管理员
      if(true){
        next()
      }else{
        this.$message('暂无权限')
        next(false)
      }
    }
  },]

})



export default router;

