import md5 from 'js-md5';
import { setstore, getstore } from '@/utils/auth'
import { toLogin } from '@/api/index'
const state = {
        name: '',
        token: getstore('ticket') ? getstore('ticket') : ''
      }
const mutations = {
        SET_TOKEN: (state, token) => {
          state.token = token
        },
      }
const actions = {
        login({ commit },userInfo) {
          const { userName, passWord } = userInfo
          return new Promise((resolve, reject) => {
            let md5PassWord = md5(passWord)
            console.log(userName,md5PassWord,resolve,reject)
            toLogin({userName,passWord: md5PassWord}).then(data => {
              commit('SET_TOKEN', data.ticket)
              setstore('ticket', data.ticket)
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
