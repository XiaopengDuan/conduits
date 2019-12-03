import Vue from 'vue'
import Vuex from 'vuex'
import app from '@/store/modules/app' // 系统应用模块
import user from '@/store/modules/user' 
import getters from '@/store/getters'

Vue.use(Vuex)
const modules = {
  app,
  user
}
const store = new Vuex.Store({
  modules,
  getters
})

export default store