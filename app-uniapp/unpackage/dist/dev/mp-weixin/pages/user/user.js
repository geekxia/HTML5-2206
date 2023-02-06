"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup(__props) {
    const store = common_vendor.useStore();
    console.log("---store", store);
    const num = common_vendor.computed$1(() => store.state.study.count);
    const add = () => {
      store.commit("study/addCount", 5);
    };
    const skipIndex = () => {
      common_vendor.index.navigateTo({
        url: "/pages/index/index?id=2022"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(skipIndex),
        b: common_vendor.t(common_vendor.unref(num)),
        c: common_vendor.o(add)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/2206/app-uniapp/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
