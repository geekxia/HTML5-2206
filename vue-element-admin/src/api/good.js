import request from '@/utils/request'

// 商品列表接口（与用户有关）
export function getGoodList(params) {
  return request({
    url: '/good/list',
    method: 'get',
    params
  })
}

export function getCheckGoodList(params) {
  return request({
    url: '/check/good/list',
    method: 'get',
    params
  })
}

export function checkGood(good_id) {
  return request({
    url: '/check/good',
    method: 'POST',
    data: { good_id, check: 1 }
  })
}

// 品类接口
export function getAllCates(params = {}) {
  return request({
    url: '/cate/all',
    method: 'get',
    params
  })
}

// 商品添加或编辑
export function submitGood(data) {
  return request({
    url: '/good/update',
    method: 'POST',
    data
  })
}

export function getGoodInfo(id) {
  return request({
    url: '/good/info',
    method: 'GET',
    params: { id }
  })
}

export function goodDel(ids) {
  return request({
    url: '/good/del',
    method: 'POST',
    data: { ids }
  })
}
