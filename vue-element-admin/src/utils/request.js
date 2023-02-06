import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 为了解决调接口遭遇同源策略的阻塞，这里“前端项目调用当前端口上的接口”
const baseURL = 'http://localhost:9527'
const version = '/api/v1/element'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: baseURL + version,
  timeout: 5000
})

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // 在Headers上添加Token(鉴权)
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(

  response => {
    // 如果代码走到这里，HTTP状态码=200
    const res = response.data
    console.log('----响应拦截器', res)
    // 对业务状态码进行判断
    if (res.err !== 0) {
      // 如果业务状态码不等于0，表示业务失败，就把后端的反馈信息弹出来。
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 当Token过期或者Token是伪造的，要求重新登录。
      if (res.err === -1) {
        // 登录重新登录
        MessageBox.confirm('当前你的登录已失效', '请重新登录', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      // 当业务逻辑正确时
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
