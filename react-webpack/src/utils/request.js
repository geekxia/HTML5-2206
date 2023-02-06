import axios from 'axios'
import { message, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import store from '@/store'
import { resetUser } from '@/store/actions'
const { confirm } = Modal

// 为了解决调接口遭遇同源策略的阻塞，这里“前端项目调用当前端口上的接口”
const baseURL = 'http://localhost:8080'
const version = '/api/v1/react'

// 创建axios实例
const service = axios.create({
  baseURL: baseURL + version,
  timeout: 5000
})

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    // 添加Token
    config.headers.Authorization = localStorage.getItem('token')
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
      message.error(res.msg || '入参有误')

      // 当Token过期或者Token是伪造的，要求重新登录。
      if (res.err === -1) {
        // 登录重新登录
        confirm({
          title: '当前你的登录已失效',
          icon: <ExclamationCircleOutlined />,
          content: '请重新登录',
          okText: '重新登录',
          // 隐藏取消按钮，要求必须重新登录
          cancelButtonProps: {
            style: { display: 'none' }
          },
          onOk() {
            store.dispatch(resetUser())  // 走流程清空user这个子store
          }
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      // 当业务逻辑正确时（err===0）数据过滤
      // console.log('----调接口成功', res.data)
      return res.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
