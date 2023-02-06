import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)  // $store

import study from './modules/study'
import good from './modules/good'
import user from './modules/user'

// 根store
const store = new Vuex.Store({
  // 用于合并子store，这是一个架构层面的概念
  // 在根store已经使用了modules拆分子store，事实上还可以再使用其它state/getters/....
  modules: {
    // 左key，我称之为子store的命名空间
    study,
    good,
    user
  }
})
export default store
