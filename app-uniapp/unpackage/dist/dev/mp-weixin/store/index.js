"use strict";
var common_vendor = require("../common/vendor.js");
var store_modules_study = require("./modules/study.js");
const store = common_vendor.createStore({
  modules: {
    study: store_modules_study.study
  }
});
exports.store = store;
