import Vue from 'vue'
import Vuex from 'vuex'
import app from '@/store/modules/app' // 系统应用模块
import user from '@/store/modules/user'
import permission from '@/store/modules/permission'
import getters from '@/store/getters'

Vue.use(Vuex)
const modules = {
  app,
  user,
  permission
}
const store = new Vuex.Store({
  modules,
  getters
})

export default store