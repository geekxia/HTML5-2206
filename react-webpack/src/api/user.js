import request from '@/utils/request'

export function fetchLogin (data) {
  return request({
    url: '/user/login',
    method: 'POST',
    data
  })
}

// 使用headers传递Token
export function fetchUserInfo () {
  return request({
    url: '/user/info',
    method: 'GET',
    params: {}
  })
}
