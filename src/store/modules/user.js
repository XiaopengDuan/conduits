import md5 from 'js-md5';
// import { toLogin } from '@/api/index'
const state = {
        name: '',
      }
const mutations = {
    
      }
const actions = {
        login(userInfo) {
          const { userName, passWord } = userInfo
          return new Promise((resolve, reject) => {
            let md5PassWord = md5(passWord)
            console.log(userName,md5PassWord,resolve,reject)
            // toLogin({userName,passWord: md5PassWord}).then(() => {
              
            //   resolve()
            // }).catch(error => {
            //   reject(error)
            // })
          })
        },
      }
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
