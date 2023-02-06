import request from '@/utils/request'

export function fetchCates () {
  return request({
    url: '/good/cates',
    method: 'GET',
    params: {}
  })
}

export function fetchGoodList (params) {
  return request({
    url: '/good/list',
    method: 'GET',
    params
  })
}

export function fetchGoodSubmit (data) {
  return request({
    url: '/good/update',
    method: 'POST',
    data
  })
}


export function fetchGoodInfo (id) {
  return request({
    url: '/good/info',
    method: 'GET',
    params: { id }
  })
}
