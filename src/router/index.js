import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


var router = new Router({
  routes:[{
    path: '/',
    redirect: '/home',
  },{
    path: '/home',
    name: 'Home',
    component: () =>
      import ('../components/Home/home.vue'),
    meta: {
      title: '首页'
    }
  },]

})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router;

