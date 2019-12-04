import { asyncRoutes } from '@/router'
  const state = {
    routes: [],
    addRoutes: []
  }
  const mutations = {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = routes
    }
  }
  const actions = {
    generateRoutes({ commit }, data) {
      return new Promise(resolve => {
        let accessedRoutes
        if (data.roles.includes('admin2')) {
          accessedRoutes = asyncRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes( asyncRoutes, data.menuPerms)
        }
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (tmp.meta && tmp.meta.permissionCode && hasRouter(roles, tmp.meta.permissionCode)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}
function hasRouter(roles, name){
  return roles.includes(name)
}
