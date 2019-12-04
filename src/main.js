import Vue from 'vue'
import App from '@/App.vue'
import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css';
import SlideVerify from 'vue-monoplasty-slide-verify'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import store from '@/store'
import '@/assets/css/index.css'
import "./assets/css/style-index.css"
import "./assets/css/lodaing.css"
import './permission.js'

// 简单配置
// NProgress.inc(0.2)
import ElementUI from 'element-ui'
NProgress.configure({ easing: 'ease', speed: 800, showSpinner: false })
Vue.use(SlideVerify)
Vue.use(ElementUI, {size: 'medium'})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
