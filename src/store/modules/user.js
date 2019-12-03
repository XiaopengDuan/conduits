import md5 from 'js-md5';
import { setstore, getstore } from '@/utils/auth'
import { toLogin } from '@/api/index'
const state = {
        name: getstore('userName') ? getstore('userName') : '',
        token: getstore('ticket') ? getstore('ticket') : ''
      }
const mutations = {
        SET_TOKEN: (state, token) => {
          state.token = token
        },
        USER_NAME: (state, name) => {
          state.name = name
        }
      }
const actions = {
        login({ commit },userInfo) {
          const { userName, passWord } = userInfo
          return new Promise((resolve, reject) => {
            let md5PassWord = md5(passWord)
            toLogin({userName,passWord: md5PassWord}).then(data => {
              commit('SET_TOKEN', data.ticket)
              setstore('ticket', data.ticket)
              commit('USER_NAME', data.userName)
              setstore('userName', data.userName)
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
        },
      }
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
