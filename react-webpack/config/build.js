const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require('terser-webpack-plugin')

// 只有打包时才能用到的配置
module.exports = {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      // 指定使用tenser进行压缩
      new TerserPlugin({
        parallel: true,
        terserOptions: {}
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    })
  ],
  module: {
    rules: [
      // MiniCssExtractPlugin.loader用于把css-loader返回的css代码，写到一个css文件中去。
      { test: /\.(scss|css)$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] }
    ]
  }
}
