// 从node进程中引入path模块，path.resolve()/join()
// __dirname 当前脚本文件所在目录（绝对路径）
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ProgressPlugin, ProvidePlugin } = require('webpack')

// 两种环境都需要的公共配置
module.exports = {
  // 入口配置
  // entry: './src/main.js',  // 相对路径
  // entry: path.resolve(__dirname, 'src/main.js'),   // 绝对路径
  entry: {
    // 把第三方从业务代码中抽离出来，为了以后部署时做CDN优化
    vendors: ['react', 'react-dom/client'],
    // 可以给入口文件取一个名字，给output使用
    app: {
      // 用import属性指定业务代码的入口位置
      import: path.resolve(__dirname, '../', 'src/main.js'),
      // 用dependOn指定业务代码所依赖的第三方包
      dependOn: 'vendors'
    }
  },
  // 出口配置
  output: {
    // 指定打包结果的输出目录，默认是dist目录，这里只能使用绝对路径
    path: path.resolve(__dirname, '../', 'dist'),
    // 指定打包结果的JS名称规范，[name]这个格式化字符串表示入口中JS文件的别名
    // [chunkhash:8]这个格式化字符，用于给输入文件添加hash字符。为什么要添加hash字符？
    // [chunkhash:8]有什么特点？输入的JS模块所依赖源码发生变化，打包时hash才会发生变化，用于解决“浏览器缓存导致的Web不更新”的问题。
    filename: 'js/[name].[chunkhash:8].js',  // bundle量词，一捆、一束
    // 每次build打包时，都自动先删除dist中的旧代码
    clean: true,
  },
  // 插件（具有特殊的小而美的功能）
  // 所有的webpack插件都是class类，用的时候需要new
  plugins: [
    // 用于把JS脚本和index.html自动注入
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../', 'public/index.html'),
      inject: 'body',   // 把JS脚本注入到body结束标签的前面
      filename: 'index.html',  // 指定打包成功后这个模板叫什么名称
      title: '千锋',  // 指定index.html的<title>
      favicon: path.resolve(__dirname, '../', 'public/favicon.ico')
    }),
    // 添加编译进度条
    new ProgressPlugin({
      // 自定义进度条的内容
      // handler(percentage, message, ...args) {
      //   if (percentage === 1) {
      //     console.log('100% 启动成功')
      //   } else {
      //     console.log(`${Math.floor(percentage*100)}% 正在编译...`)
      //   }
      // }
    }),
    // 从node_modules中加载react包，将其放在全局，这样之后所有文件模块都可以直接访问
    new ProvidePlugin({
      React: path.resolve(__dirname, '../', 'node_modules/react/index.js')
    })
  ],
  // 在webpack眼中一切文件皆模块，webpack必须使用各种loaders来处理各种不同的模块文件。
  module: {
    // 定义模块编译的规则和方式
    rules: [
      // 人话：当webpack工作时，遇到以.js结尾的模块时，就使用babel-loader进行加载，交给@babel/*编译器进行编译，得到ES5代码。
      // exclude 表示排除掉node_modules中第三方包的编译，以提升编译速度
      { test: /\.(js|jsx|ts|tsx)$/, use: 'babel-loader', exclude: /node_modules/, include: /src/ },
      // 图片模块处理，在webpack(V4)使用url-loader/file-loader可以处理。
      // { test: /\.(png|jpg|webp|jpeg|svg|gif)$/, use: 'url-loader' },

      // 在webpack(v5)中，这种写法相当于file-loader的写法
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource',
        generator: {
          // 指定打包时图片放置的路径
          filename: 'img/[name].[contenthash:8][ext]'
        }
      }
    ]
  },
  // 解析配置
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../', 'src')
    },
    // 在源码导入模块时，允许省略的后缀
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    // 指定加载第三方包的目录
    modules: [path.resolve(__dirname, '../', 'node_modules')],
  },
  // 和Babel的targets配置一起工作，最小化目标
  target: 'web'
}
