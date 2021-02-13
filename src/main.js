import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
// 导入自定义字体图标
import './assets/fonts/iconfont.css'
import './plugins/element.js'
// 导入全局样式表
import '../src/assets/css/global.css'
// 配置全局axios
import axios from 'axios'
// 配置axios的请求的根路径
axios.defaults.baseURL = 'http://anonymous.org.cn:8888/api/private/v1/'
// 通过axios请求拦截器添加token，保证其他接口请求时拥有获取数据的权限
axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 将axios挂载到Vue的原型对象上，这样的话每一个Vue组件都可以通过this上直接访问到$http来向后端发送http请求
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
