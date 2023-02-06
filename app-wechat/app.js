// app.js
App({
  onLaunch () {
    // 入口
    console.log('--小程序启动了')
    wx.login({
      success(res) {
        console.log('---code', res.code)
        // 再fetch({code})传给后端。
        wx.setStorageSync('msg', '你好')  
      }
    })
    // 弹出地理位置授权框
    wx.getSetting({
      success: res=>{
        if (!res.authSetting['scope.userLocation']) {
          // 如果用户拒绝了，将不再自动弹出授权框
          wx.authorize({
            scope: 'scope.userLocation',
            success: res=>{
              console.log('--用户同意了位置授权', res)
            },
            fail: err => {
              console.log('--用户拒绝了位置授权', err)
            }
          })
        }
      }
    })
  },
  globalData: {
    name: '千锋'
  }
})
