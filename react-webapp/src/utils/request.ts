import axios from 'axios'

const baseURL = 'http://localhost:9090'  // 解决跨域问题
const version = '/api/v1'

// 创建axios实例
const instance = axios.create({
  baseURL: baseURL + version,
  timeout: 5000,  // 单位是毫秒
  headers: {}
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
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
}, function (error) {
  // 如果代码走到这儿，说明HTTP状态码一定不是200
  return Promise.reject(error)
})

export default instance
