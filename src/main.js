import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import SlideVerify from 'vue-monoplasty-slide-verify'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import '@/assets/css/index.css'

// 简单配置
// NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 800, showSpinner: false })
Vue.use(SlideVerify)
Vue.use(ElementUI, {size: 'medium'})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
