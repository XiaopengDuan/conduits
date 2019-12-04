import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'
import { getstore } from '@/utils/auth' // get token from cookie
import NProgress from 'nprogress'
const whiteList = ['/login','/test', '/lostPassWord'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  var hasToken;
  if(getstore('ticket')){
    hasToken = JSON.parse(getstore('ticket'))
  }
  console.log(to)
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        if (to.matched.length === 0) {
          next({ path: '/404' })
        } else {
          store.commit('user/JURISDICTION',to.meta.permissionCode)
          next()
        }
      } else {
        try {
          // 根据Token获取登录用户信息
          const data = await store.dispatch('user/getInfo')
          // 动态加载路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', data)
          router.addRoutes(accessRoutes)
          store.commit('user/JURISDICTION',to.meta.permissionCode)
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
