"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var store_index = require("./store/index.js");
require("./store/modules/study.js");
if (!Math) {
  "./pages/user/user.js";
  "./pages/index/index.js";
}
const _sfc_main = {
  setup(__props) {
    console.log("---app setup");
    common_vendor.onLaunch(() => {
      common_vendor.index.login({
        success(res) {
          console.log("--res code", res.code);
        }
      });
    });
    return () => {
    };
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/2206/app-uniapp/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(store_index.store);
  return {
    app,
    store: store_index.store
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
