import produce from 'immer'

const initState = {
  token: localStorage.getItem('token'),
  avatar: '',
  roles: [],
  introduction: '',
  name: '',
  accessRoutes: []  // 用于保存当前用户可访问的动态路由们
}

export default (state=initState, {type, payload}) => {
  return produce(state, state=>{
    switch (type) {
      case 'USER_LOGIN':
        state.token = payload
        break
      case 'USER_INFO':
        const { avatar, roles, introduction, name } = payload
        state.avatar = avatar
        state.roles = roles
        state.introduction = introduction
        state.name = name
        break
      case 'USER_PERMISSION':
        state.accessRoutes = payload
        break
      case 'USER_RESET':
        localStorage.removeItem('token')
        state.token = null
        state.roles = []
        state.accessRoutes = []
        state.avatar = ''
        state.name = ''
        state.introduction = ''
        break
      default:

    }
  })
}
