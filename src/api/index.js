import request from '@/utils/request'
import api from '@/api/api'
const uaBaseUrl = "http://192.168.10.21:19998"
// 登入
export function toLogin(data) {
    return request({
        url: api.login,
        method: 'post',
        baseURL: uaBaseUrl,
        data
    })
}
// 权限
export function getLoginfo(data) {
    return request({
        url: api.jurisdiction,
        method: 'post',
        baseURL: uaBaseUrl,
        data
    })
}