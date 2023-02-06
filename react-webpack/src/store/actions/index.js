// action生成器，一个生成器方法就相当于是一个业务功能。
// 为什么要封装action生成器？便于维护，可以复用！

import { fetchLogin, fetchUserInfo } from '@/api/user'
import { fetchCates } from '@/api/good'

export function switchSize (size) {
  return { type: 'APP_SIZE', payload: size }
}

export function switchLang (lang) {
  return { type: 'APP_LANG', payload: lang }
}

export function switchColor (color) {
  return { type: 'APP_COLOR', payload: color }
}

// 异步的action生成器（是为了配合redux-thunk的异步生成器）
export function login (data) {
  // 返回一个函数。
  // 提问：这个被返回的函数，为什么有dispatch参数？（redux-thunk给的）
  return function (dispatch) {
    fetchLogin(data).then(({token})=>{
      // 登录成功
      if (token) {
        // 把Token存储到本地
        localStorage.setItem('token', token)
        // 把Token派发到Redux中存储起来
        dispatch({ type: 'USER_LOGIN', payload: token })
      }
    })
  }
}

export function getInfo () {
  return dispatch => {
    fetchUserInfo().then(res=>{
      console.log('---用户信息', res)
      // 严谨一点的判断，res.roles = ['admin', 'editor']
      if (res && res.roles) {
        dispatch({ type: 'USER_INFO', payload: res })
      }
    })
  }
}

export function resetUser () {
  return { type: 'USER_RESET',  payload: null }
}

export function getCates () {
  return dispatch => {
    fetchCates().then(res=>{
      if (res.list) {
        // 在redux传统架构中，type不能冲突，所以一般要求大写，并且首个单词是子store的名称
        dispatch({ type: 'GOOD_CATES', payload: res.list })
      }
    })
  }
}
