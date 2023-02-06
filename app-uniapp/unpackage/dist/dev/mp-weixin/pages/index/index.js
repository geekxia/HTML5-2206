"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup(__props) {
    const num = common_vendor.ref(0);
    const list = common_vendor.reactive([
      { id: 1, name: "\u5F20\u4E09", age: 10 },
      { id: 2, name: "\u5F20\u4E09", age: 10 },
      { id: 3, name: "\u5F20\u4E09", age: 10 },
      { id: 4, name: "\u5F20\u4E09", age: 10 }
    ]);
    common_vendor.onMounted(() => console.log("---index mounted"));
    common_vendor.onLoad((opt) => {
      console.log("---\u8DEF\u7531\u53C2\u6570", opt);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(num.value),
        b: common_vendor.n("num"),
        c: common_vendor.o(($event) => num.value++),
        d: common_vendor.f(common_vendor.unref(list), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.id),
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.age),
            d: item.id
          };
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/2206/app-uniapp/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
