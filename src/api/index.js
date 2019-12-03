import request from '@/utils/request'
import api from '@/api/api'
// 登入
export function login(data) {
    return request({
      url: api.login,
      method: 'post',
      data
    })
  }