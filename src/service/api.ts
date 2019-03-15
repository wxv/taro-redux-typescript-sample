import Taro from '@tarojs/taro'
import { HTTP_STATUS } from '../constants/status'
import { BASE } from './config'
import { logError } from '../utils'

const token = ''

export default {
    baseOptions(params, method) {
        let { url, data } = params
        console.log('params', params)
        let contentType = 'application/x-www-form-urlencoded'
        contentType = params.contentType || contentType
        let option:Taro.request.Param = {
            url: BASE + url,
            data: data,
            method: method || 'GET',
            header: { 'content-type': contentType, 'token': token },
            success(res) {
                if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
                    return logError('api', '请求资源不存在')
                } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
                    return logError('api', '服务端出现了问题')
                } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
                    return logError('api', '没有权限访问')
                } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
                    return res.data
                }
            },
            fail(e) {
                logError('api', '请求接口出现问题', e)
            }
        }
        return Taro.request(option)
    },
    /** GET 请求 
     * @url 请求路径 
     * @data 请求参数 
     */
    get(url, data = '') {
        let option = { url, data }
        return this.baseOptions(option)
    },
    /** GET 请求 
     * @url 请求路径 
     * @data 请求参数 
     * @contentType 请求类型
     */
    post: function (url, data, contentType) {
        let params = { url, data, contentType }
        return this.baseOptions(params, 'POST')
    }
}
