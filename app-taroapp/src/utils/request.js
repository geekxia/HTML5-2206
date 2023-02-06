import Taro from '@tarojs/taro'

const baseURL = 'https://cnodejs.org'

function request (url, method, data) {
  // Taro API 虽然是小程序API风格，但都支持Promise
  return new Promise(resolve=>{
    Taro.request({
      url: baseURL + url,
      method,
      data,
      success (res) {
        if (res && res.data.success) {
          resolve(res.data.data)
        }
      }
    })
  })
}

export function fetchCnode (data) {
  return request('/api/v1/topics', 'GET', data)
}
