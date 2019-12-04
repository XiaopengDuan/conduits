import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    hidden: true,
    meta: {}
  },
  {
    path: '/lostPassWord',
    name: 'lostPassWord',
    component: () => import('@/views/lostPassWord'),
    hidden: true,
    meta: {}
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  // { path: '/', redirect: '/login', hidden: true }
]
// console.log(store,123)
export const asyncRoutes = [
  { 
    path: '/homepage',
    name: 'homepage',
    alwaysShow: true,
    component: () => import('@/views/homepage/index.vue'),
    meta: {
      title: "大数据管理平台-用户",
      permissionCode: 'CHARGE'
    },
    children: [
      {
        path: '/Public2',
        name: 'Public2',
        component: () => import('@/views/homepage/Public2'),
        meta: {
          title: "大数据管理平台-用户列表",
          permissionCode: 'CHARGE.CHARGEINDEX',
        }
      },
      {
        path: '/Public',
        name: 'Public',
        component: () => import('@/views/homepage/Public'),
        meta: {
          title: "大数据管理平台-用户列表",
          permissionCode: 'CHARGE.ARREAR',
        }
      },
    ]
  }
]
let keepAliveArray = []
function findMeta(arr, arrValue) {
  arr.forEach((value) => {
    if (value.meta && value.meta.keepAlive && value.meta.keepAlive === true) {
      arrValue.push(value.name)
    }
    if (value.children && value.children.length > 0) {
      findMeta(value.children, arrValue)
    }
  })
}
findMeta(asyncRoutes, keepAliveArray)

export const router = new VueRouter({
  routes
})

export default router
