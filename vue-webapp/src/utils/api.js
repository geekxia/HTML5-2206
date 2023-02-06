import fetch from './fetch'  // 导入axios实例

// 商品列表接口
export function fetchGoodList (params = {}) {
  return fetch({
    url: '/api/v1/vant/good/list',
    method: 'GET',
    params
  })
}

// 获取品类
export function fetchCates (params = {}) {
  return fetch({
    url: '/api/v1/vant/good/cates',
    method: 'GET',
    params
  })
}

// 获取商品详情
export function fetchGoodInfo (id) {
  return fetch({
    url: '/api/v1/vant/good/info',
    method: 'GET',
    params: { id }
  })
}

// 注册
export function fetchRegist (data) {
  return fetch({
    url: '/api/v1/vant/user/regist',
    method: 'POST',  // axios的POST请求，入参使用data选项
    data
  })
}

// 登录
export function fetchLogin (data) {
  return fetch({
    url: '/api/v1/vant/user/login',
    method: 'POST',  // axios的POST请求，入参使用data选项
    data
  })
}

// 添加购物车
export function fetchCartAdd (data) {
  return fetch({
    url: '/api/v1/vant/cart/add',
    method: 'POST',
    data
  })
}

// 获取我的购物车列表
export function fetchCartList (params={}) {
  return fetch({
    url: '/api/v1/vant/cart/list',
    method: 'GET',
    params
  })
}

// 删除一条购物车商品
export function fetchCartDel (id) {
  return fetch({
    url: '/api/v1/vant/cart/delete',
    method: 'GET',
    params: { cart_id: id }
  })
}

// 提交购物车
export function fetchCartSubmit (ids) {
  return fetch({
    url: '/api/v1/vant/cart/submit',
    method: 'POST',
    data: { ids }
  })
}

// 更新购物车中商品记录的数量
export function fetchCardUpd (params) {
  return fetch({
    url: '/api/v1/vant/cart/update',
    method: 'GET',
    params
  })
}
