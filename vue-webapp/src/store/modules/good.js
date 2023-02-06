// 子store
import { fetchGoodList } from '@/utils/api'

const state = {
  cache: {},  // 专门缓存二级品类数据
}

const mutations = {
  updateCache (state, {activeKey,list} ) {
    state.cache[activeKey] = list
    // 解决页面不更新的问题
    state.cache = JSON.parse(JSON.stringify(state.cache))
  },
  cleanCache () {
    // 清除缓存
    state.cache = {}
  }
}

const actions = {
  getList (store, { cate, activeKey }) {
    // 根据指定的品类获取对应的商品列表
    // 这个cate来自于页面，表示当前品类
    fetchGoodList({cate}).then(res=>{
      // console.log('----- vuex good list', res)
      const payload = {
        activeKey,
        list: res.list
      }
      store.commit('updateCache', payload)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
