const state = {
  token: localStorage.getItem('token'),  // 解决“刷新后登录状态丢失”问题
  userinfo: {},
  setting: {}
}

const getters = {
  // 判断用户是否登录了？
  isLogin (state) {
    // do something 使用各种用户数据来生成一个isLogin布尔值
    return Boolean(state.token)
  }
}

const mutations = {
  setToken (state, token) {
    state.token = token
  },
  resetUser () {
    state.token = ''
    state.setting = {}
    state.userinfo = {}
    localStorage.removeItem('token')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
