import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
// import { getstore } from '@/utils/auth'
import md5 from 'js-md5'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: '', // 数据模拟的地址
  timeout: 5000 // request timeout
})
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
        config.headers.common['ticket'] = store.getters.token
        config.headers.common['sessionid'] = md5(store.getters.jurisdiction)
    }
    return config
  },
  error => {
    return Promise.reject(error, 'error')
  }
)

// response interceptor
service.interceptors.response.use(response => {
  const res = response.data
  if (res.code === -1) {
    Message({
      message: '被抢登,或者是服务器在维护', // error.message,
      type: 'error'
    })
    window.localStorage.clear()
  }
  if (res) { // 目前业务正常代码是20000
    return Promise.resolve(res)
  } else {
    Message({
      message: res.message || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    if (res.code === 50008 || res.code === 50012 || res.code === 50014) { // 返回状态码2开头的,这里可以定义业务code
      // to re-login
      MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        confirmButtonText: 'Re-Login',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    }
    // return Promise.resolve(res)
    return Promise.reject(new Error(res.message || 'Error'))
  }
},
error => { // 这里可以出里不同的状态码
  Message({
    message: '服务器繁忙，连接失败', // error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

export default service
