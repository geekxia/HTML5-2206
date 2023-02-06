// webpack是基于NodeJS的，所以配置文件中的代码都是CommonJS语法

const { merge } = require('webpack-merge')

const config = require('./config/config')
const serve = require('./config/serve')
const build = require('./config/build')

module.exports = function ( {development} ) {
  // 问题：在这里如何知道用户执行的是哪个命令？如何合并配置文件？

  // npm run serve 希望 config/serve.js + config/config.js
    // { WEBPACK_SERVE: true, development: true }

  // npm run build 希望 config/serve.js + config/config.js
    // { WEBPACK_BUNDLE: true, WEBPACK_BUILD: true, production: true }

  // 返回webpack有效配置
  return merge(config, development ? serve : build)
}
