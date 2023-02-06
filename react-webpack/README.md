# Webpack简介

- 构建工具（基于NodeJS的）node(v16) 前端工程化
- 打包器，从入口文件开始，按照模块依赖进行打包，得到浏览器能够普遍兼容的静态资源文件
- 架构思维，在某种程度上webpack代表的是一种架构能力（技术选型）

- 准备工作：NodeJS(v16)、npm、yarn、cnpm
- npm i yarn -g
- npm install cnpm -g --registry=https://registry.npmmirror.com

# 搭建环境

- 创建一个项目目录，名字叫 react-webpack
- 进入项目根目录，执行 npm init  // 创建一个空的package.json

- cnpm i webpack -g  // 这是webpack核心包（提供了很多API、插件）
- cnpm i webpack -D

- cnpm i webpack-cli -g   // 这是webpack命令行包（它提供了很多命令）
- cnpm i webpack-cli -D
- 如何验证webpack-cli安装成功？  // webpack -v 或 webpack -h

- cnpm i webpack-dev-server -g  // 官方推荐的用于构建本地服务器的包
- cnpm i webpack-dev-server -D

- Webpack是基于NodeJS环境的。我怎么让Webpack工作？（编写配置文件）
- 官方建议的配置文件：webpack.config.js （开始编写配置文件）
- 在项目根目录创建 src/main.js 入口文件

- entry入口配置的三种写法
- output出口配置的一般写法（path、filename）
- 使用webpack-dev-server集成本地服务，devServer配置（port、public目录）

- 因为webpack有两种工作模式，为了让配置更加容易维护，所以我们分离环境。
- 在 webpack --env 指定环境，在配置文件 module.exports = function(env) 接收环境变量
- 对 webpack配置进行拆分（公共配置、开发环境配置、打包配置），再使用 webpack-merge合并配置

- 使用html-webpack-plugin，对JS和public/index.html实现自动注入。

- 使用webpack.ProgressPlugin，添加编译进度条。

- 目前，咱们的webpack只是完成了入口到出口的基本配置？丝毫没有考虑到文件模块的编译问题。
- 在前端工程化中，常见的文件模块：.js / .vue / .jsx / .ts / .png / .scss / .css / .json
- 在webpack中，使用 loaders来处理这个花里胡哨的文件模块。

- 在webpack中，如何处理.js模块？
  - 安装 babel-loader，在webpack中配置module.rules
  - 安装 @babel/core、@babel/preset-*和相关Babel插件，还要在项目根目录添加babel.config.js配置文件


# webpack总结

# webpack面试题


# ReactRouter

- 工作中的两个版本：V5、V6，都是基于组件、Hooks的。
- V6版本，大约是在2021九月左右。

- react-router  路由核心包
- react-router-dom   基于浏览器的路由包（专用于Web开发）
- react-router-navite   基于RN平台的路由包（专用于App开发）

- 安装： cnpm i react-router-dom -S


# antd

- 安装： cnpm i antd -S
- 样式导入建议：在index.html使用CDN导入样式。


# redux

- 传统架构：redux + react-redux + redux-thunk + immer
- 最新架构：@reduxjs/toolkit + react-redux + TS  （create-react-app搭建React端环境）
