const ESLintPlugin = require('eslint-webpack-plugin')

// 只有开发环境才需要的配置
module.exports = {
  // 指定webpack工作模式（只有两种模式，一种开发模式、另一种是打包模式）
  mode: 'development',   // production
  // 希望调试控制台中报错的位置和src源码位置保持一致
  devtool: 'inline-source-map',  // eval-source-map
  optimization: {
    minimize: false,
  },

  // 本地服务器配置，默认的本地服务器目录是public
  // devServer配置，只对开发环境有用
  devServer: {
    port: 8080,   // 指定端口
    open: true,   // 项目启动编译成功，自动打开浏览器
    hot: true,    // 指定集成热更新功能（HRM=Hot Replacement Module）
    client: {
      // 只有error时，才产生覆盖层。
      overlay: {
        errors: true,
        warnings: false
      }
    },
    // 使用代理解决跨域问题
    proxy: {
      '/api': {
        target: 'http://localhost:9999',
        changeOrigin: true
      }
    }
  },
  module: {
    rules: [
      // 人话：当webpack工作时，遇到以.scss结尾的模块时，先使用sass-loader加载模块并交给sass编译器进行编译，编译结果得到css模块，再使用css-loader加载并解析返回css代码，接收由style-loader把css代码插入到head标签中。
      // 注意：当处理一种文件模块，需要多个loaders时，先工作的loader放在数组后面。
      { test: /\.(css|scss)$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  },
  plugins: [
    // 集成ESlint代码检测
    new ESLintPlugin({
      eslintPath: 'eslint',  // 指定使用什么进行代码检测
      extensions: ['js', 'jsx', 'ts', 'tsx'],  // 对哪些模块进行检测
      exclude: ['node_modules'],  // 提升运行速度
      fix: false,   // 关闭自动修复
      formatter: 'stylish'
    })
  ]
}
