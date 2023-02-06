import axios from 'axios'
// 使用axios，建议创建axios实例并为它添加拦截器。
import { Toast } from 'vant'  // JS组件
import store from '@/store'
import router from '@/router'

// const baseURL = 'https://cnodejs.org'
// const baseURL = 'http://localhost:9999'  // 我们的node服务
const baseURL = 'http://localhost:8080'  // 解决跨域问题

// 创建axios实例
const instance = axios.create({
  baseURL,
  timeout: 5000,  // 单位是毫秒
  headers: {}
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 添加token，把token通过headers传递给后端，后端接收token反解析。
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
    return Promise.reject(error)
})


// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // console.log('----响应拦截器', response)
  // 如果代码走到这儿，说明HTTP状态码一定是200

  // 过滤cnode数据
  if (response.data && response.data.success) {
    return response.data.data
  }

  // 过滤node服务器的数据
  if (response.data && response.data.err===0) {
    return response.data.data
  } else if (response.data && response.data.err === -1) {
    // 如果发现token是假的或者过期了
    // 重置vuex中的用户信息、清除本地存储中的token、立即跳转到登录页
    store.commit('user/resetUser')
    localStorage.removeItem('token')
    router.push('/login')
  } else {
    // 如果出现业务逻辑的错误，把后端返回的msg弹出来，提示用户
    Toast.fail(response.data.msg)
    return null
  }

  // return response   不可抵达的代码
}, function (error) {
  // 如果代码走到这儿，说明HTTP状态码一定不是200
  return Promise.reject(error)
})

export default instance
