// pages/user/user.js
const { calDis } = require('../../utils/map')
const app = getApp()
console.log('---app', app)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',
    isLoc: true
  },

  save () {
    
    wx.saveImageToPhotosAlbum({
      filePath: this.data.avatar,
      success: res => {
        console.log('---保存到相册成功', res)
      },
      fail: err => {
        console.log('---err', err)
      }
    })
  },
  // 初始化钩子
  onShow () {
    wx.getSetting({
      success: res=>{
        console.log('---当前用户的授权列表', res.authSetting)
        this.setData({
          isLoc: res.authSetting['scope.userLocation']
        })
        // 在用户已经同意过位置授权时
        if (res.authSetting['scope.userLocation']) {
          wx.getLocation({
            success: from => {
              console.log('---当前用户的位置', from)
              // 有了经纬度，调接口从后端获取商家列表
              const shopList = [
                { id: '华润万家', latitude:39.984060, longitude:116.307520 },
                { id: '肯德基', latitude:39.984060, longitude:116.307520 },
                { id: '沃尔玛', latitude:39.984060, longitude:116.307520 }
              ]
              calDis(from, shopList).then(list=>{
                console.log('---计算结果', list)
              })
            }
          })
        }
      }
    })
  },

  open1 () {
    wx.openSetting({
      withSubscriptions: true,
      success: (res) => {
        console.log('---授权同意', res)
      }
    })
    // wx.authorize({
    //   scope: 'scope.writePhotosAlbum',
    //   success (res) {
    //     console.log('---同意授权', res)
    //   },
    //   fail (err) {
    //     console.log('---拒绝授权', err)
    //   }
    // })
  },

  open () {
    wx.getUserProfile({
      desc: '为了安全，请求访问你的用户信息',
      // 注意this指向
      success: (res) => {
        console.log('---用户同意了授权用户信息', res)
        // 把用户信息发给后端，保存数据库中。
        this.setData({
          avatar: res.userInfo.avatarUrl
        })
      },
      fail (err) {
        console.log('---用户拒绝了授权', err)
      }
    })
  },
  getMobile (ev) {
    console.log('---获取手机', ev)
  },
  login () {
    wx.openSetting({
      success(){}
    })
  },

  onReady () {
    // 监听位置变化
    wx.onLocationChange((result) => {
      console.log('----位置变化了--')
    })
  },
  // 当转发时，会触发这个钩子
  onShareAppMessage (res) {
    // console.log('转发', res)
    if (res.from === 'button') {
      return {
        title: '正在拼团',
        path: '/pages/index/index?id=openid&tuanid=100',
        imageUrl: 'https://img12.360buyimg.com/jdcms/s300x300_jfs/t1/194565/6/14632/102605/60fbe292E9e9b640c/939fcfebf73789f4.jpg'
      }
    }
    if (res.from === 'menu') {
      return {} // 默认转发当前页面
    }
  },

  onPullDownRefresh () {
    console.log('---下拉了')
  }
})