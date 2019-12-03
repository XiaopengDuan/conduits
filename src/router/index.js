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
  { path: '/', redirect: '/login', hidden: true }
]

export const router = new VueRouter({
  routes
})

export default router
