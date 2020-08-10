// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from "element-ui";
import ECharts from 'vue-echarts'
import "element-ui/lib/theme-chalk/index.css";
import VueParticles from "vue-particles";
import "./assets/style/reset.styl";

import 'echarts'
import "echarts/map/js/china.js";
// import 'echarts/lib/chart/line'
// import 'echarts/lib/chart/map'
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/title'
// import 'echarts/lib/component/Legend'
// import 'echarts/lib/component/Toolbox'
// import 'echarts/lib/component/geo'


Vue.prototype.$axios = axios
// axios.defaults.baseURL = 'http://localhost:3000/'

Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.use(VueParticles)
Vue.component('v-chart', ECharts)

Vue.config.productionTip = false

// 注册一个全局守卫，路由跳转前，对路由进行判断，防止未登录的用户跳转到其他需要登录的页面
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  // 已登陆
  if (token) {
    // router.push('/home')
    next()
  } else {
    // 判断是否前往注册
    if (to.path === '/login') {
      // 已登录
      next()
    } else {
      // 如果没有登录，跳转到登录页面
      next({ path: '/login' })
    }
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
