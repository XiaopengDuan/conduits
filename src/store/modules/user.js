import md5 from 'js-md5';
import { setstore, getstore, removestore } from '@/utils/auth'
import { toLogin, getLoginfo } from '@/api/index'
import router, { asyncRoutes } from '@/router'
const state = {
        name: getstore('userName') ? getstore('userName') : '',
        token: getstore('ticket') ? getstore('ticket') : '',
        jurisdiction: getstore('permissionCode')? getstore('permissionCode'):'',
        roles: [],
        menuPerms: [],
        thispath: getstore('THISPATH') ? JSON.parse(getstore('THISPATH')) : '',
        wmaindex: getstore('WMAINGEX')?JSON.parse(getstore('WMAINGEX')):'',
        userCenterindex: getstore('USERCENTERINDEX')?JSON.parse(getstore('USERCENTERINDEX')):'',
      }
const mutations = {
        SET_TOKEN: (state, token) => {
          state.token = token
        },
        USER_NAME: (state, name) => {
          state.name = name
        },
        JURISDICTION: (state, index) => {
          setstore('permissionCode',index)
          state.jurisdiction = index
        },
        SET_ROLES: (state, roles) => {
          state.roles = roles
        },
        SET_MENUPERMS: (state, menuPerms) => {
          state.menuPerms = menuPerms
        },
        THISPATH: (state, path) => {
          state.thispath = path
        },
        WMAINGEX: (state,index)=>{
          state.wmaindex = index
        },
        USERCENTERINDEX: (state, index)=>{
          state.userCenterindex = index
        },
      }
const actions = {
        LOGINCHARGE({ commit },pows){
          asyncRoutes.forEach(route => {
            let tmp = { ...route }
            if(tmp.meta && tmp.meta.permissionCode.indexOf('CHARGE') !== -1) {
              let childrenlist = tmp.children
              childrenlist.forEach(s=>{
                if(s.meta.permissionCode === pows[0]) {
                  let topath = tmp.path+s.path
                  console.log(topath)
                  router.push({
                    path: topath
                  })
                  commit('THISPATH',s,name)
                  setstore('THISPATH',s.name)
                }
              })
            }
          })
        },
        login({ commit, dispatch },userInfo) {
          const { userName, passWord } = userInfo
          return new Promise((resolve, reject) => {
            let md5PassWord = md5(passWord)
            toLogin({userName,passWord: md5PassWord}).then(data => {
              commit('SET_TOKEN', data.data.ticket)
              setstore('ticket', data.data.ticket)
              commit('USER_NAME', data.data.userName)
              setstore('userName', data.data.userName)
              dispatch('getInfo').then(r=>{
                var pows = r.menuPerms
                console.log(pows)
                if(pows[0].indexOf('CHARGE') !== -1) {
                  dispatch('LOGINCHARGE',pows)
                }
              })
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
        },
        // eslint-disable-next-line no-unused-vars
        getInfo({ state, commit }) {
          return new Promise((resolve) => {
            getLoginfo({ticket: state.token}).then(r=>{
              let res =JSON.parse(r.data)
              setstore('data',res)
              let pows = res.role[0].menuPerms.split(',')
              let data = {
                roles: ['admin'],
                menuPerms: pows,
                name: res.user.userName
              }
              commit('SET_ROLES', data.roles)
              commit('SET_MENUPERMS', data.menuPerms)
              resolve(data)
            }).catch(()=>{
              resolve()
            })
          })
        },
        resetToken({ commit }) {
          return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removestore('ticket')
            resolve()
          })
        },
      }
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
