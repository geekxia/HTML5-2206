
// 相当于小程序中的app.json（全局配置）
export default defineAppConfig({
  // 路由是内置的，无须安装react-router-dom
  pages: [
    'pages/find/find',
    'pages/index/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
