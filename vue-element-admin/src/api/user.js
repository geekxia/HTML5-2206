import request from '@/utils/request'

// 登录接口
export function login(data) {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}

// 用Token换取用户信息（我们node项目，使用headers传递Token）
export function getInfo() {
  return request({
    url: '/userinfo',
    method: 'GET',
    params: {}
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
