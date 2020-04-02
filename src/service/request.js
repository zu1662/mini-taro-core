import Taro from '@tarojs/taro'
import BASE_URL from './config'
import interceptors from "./interceptors"

interceptors.forEach(i => Taro.addInterceptor(i))

const base = BASE_URL
export default {
  baseOptions(params, method = 'GET') {
    let { url, data } = params
    let authorization = Taro.getStorageSync("Authorization") || ''
    let contentType = 'application/x-www-form-urlencoded'
    contentType = params.contentType || contentType
    const option = {
      isShowLoading: false,
      loadingText: '正在加载',
      url: base + url,
      data: data,
      mode: 'cors',
      method: method,
      header: { 
        'content-type': contentType,
        'Authorization': authorization 
      },
    }
    return Taro.request(option)
  },
  get(url, data = '') {
    let option = { url, data }
    return this.baseOptions(option)
  },
  post: function (url, data, contentType) {
    let params = { url, data, contentType }
    return this.baseOptions(params, 'POST')
  }
}
