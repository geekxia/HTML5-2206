import { getAllCates } from '@/api/good'

const state = {
  cates: []
}

const mutations = {
  SET_CATES(state, list) {
    state.cates = list
  }
}

const actions = {
  getCates({ commit }) {
    getAllCates().then(res => {
      if (res.data && res.data.list) {
        commit('SET_CATES', res.data.list)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
