import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)

export const constantRoutes = [
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
  { 
    path: '/homepage',
    name: 'homepage',
    alwaysShow: true,
    component: () => import('@/views/homepage/index.vue'),
    meta: {
      title: "大数据管理平台-用户",
      keepAlive: true,
      permissionCode: 'CHARGE'
    },
    children: [
      {
        path: '/Public2',
        name: 'Public2',
        component: () => import('@/views/homepage/Public2'),
        meta: {
          title: "大数据管理平台-用户列表",
          keepAlive: true,
          permissionCode: 'CHARGE.CHARGEINDEX',
        }
      },
      {
        path: '/Public',
        name: 'Public',
        component: () => import('@/views/homepage/Public'),
        meta: {
          title: "大数据管理平台-用户列表",
          keepAlive: true,
          permissionCode: 'CHARGE.ARREAR',
        }
      },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
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
findMeta(constantRoutes, keepAliveArray)
store.commit('app/SET_KEEPALIVEVALUE', keepAliveArray.join())

const createRouter = () => new VueRouter({
  mode: 'history', // require service support
  // scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
