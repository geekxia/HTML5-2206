import fetch from '@/utils/fetch'  // @是src根路径

export default {
  // 开启命名空间
  namespaced: true,  // 一会要配合map*使用
  // state
  // 凡是定义在这里的数据，就可以被组件共享。
  // 特点：当state数据被组件们使用，如果state数据发生变化，使用到这些数据的组件会自动更新。
  state: {
    msg: 'Hello Vuex',
    num: 1,
    list: []  // 文章列表
  },
  // getters
  // 相当于vue组件中的computed计算属性，用于对state做计算
  // 在这里getters只有get写法，不要用它的set写法。
  // 特点：当getters方法关联的state发生变化时，getters方法自动计算
  getters: {
    // 用于计算list的长度
    total (state) {
      return state.list.length
    }
  },
  // mutations
  // 在vuex中，是推荐的专门用于修改state方法
  mutations: {
    addNum (state, arg) {
      state.num += arg  //
    },
    updateList (state, list) {
      state.list = [...state.list, ...list]  // 数组合并
    },
    changeMsg (state, msg) {
      state.msg = msg
    }
  },
  // actions
  // 在vuex中，是推荐的专门用于和后端API打交道的方法
  actions: {
    getList (store, params) {
      // console.log('---getList store', store)
      // 调接口
      fetch({
        url: '/api/v1/topics',
        method: 'GET',
        params,
      }).then(res=>{
        console.log('---文章列表', res)
        store.commit('updateList', res)
      })
    }
  }
}
