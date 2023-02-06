const { defineConfig } = require('@vue/cli-service')

// 这是@vue/cli这个脚手架指定的配置文件（它的背后是webpack）
// 配置文件修改后，务必要重启。
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // 当vue项目中使用ajax发起请求中，如果请求的路径中有 /api ，表示匹配成功。
    // 背后的node服务就会将其代理到 target远程服务器上。
    proxy: {
      '/api': {
        target: 'http://localhost:9999',   // 是真实服务器地址
        changeOrigin: true
      }
    }
  }
})
