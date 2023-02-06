"use strict";
var study = {
  namespaced: true,
  state: {
    count: 1
  },
  mutations: {
    addCount(state, payload = 1) {
      state.count += payload;
    }
  },
  actions: {}
};
exports.study = study;
