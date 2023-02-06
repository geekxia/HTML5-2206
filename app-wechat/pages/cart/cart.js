// pages/cart/cart.js
Page({
  backToHome () {
    wx.navigateTo({
      url: '/pages/index/index?msg=呵呵&id=100',
    })
  },
  onShow () {
    // wx.getSystemInfo({
    //   success: (result) => {
    //     console.log('---手机系统信息', result)
    //   },
    // })
    wx.showToast({
      title: '成功',
      icon: 'success'
    })
    wx.setNavigationBarTitle({
      title: '你好'
    })
  },

  pay () {
    // wx.request()把要买的商品信息传给java服务器
    // 后端收到商品信息，算出价格，结合appid、app密钥调微信服务接口
    // 后端返回支付信息（密文、用户信息）等给前端
    wx.requestPayment({
      nonceStr: 'nonceStr',
      package: 'package',
      paySign: 'paySign',
      timeStamp: 'timeStamp',
      success() {
        console.log('---支付成功')
      }
    })
  },
  scan () {
    wx.scanCode({
      onlyFromCamera: true,
      scanType: 'barCode',
      success (res) {
        console.log('---扫码成功', res)
      }
    })
  }
})