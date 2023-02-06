const fecth = require('../../utils/request')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setStorageSync('hehe', '你好')
    wx.setStorage({
      key: 'haha',
      data: '你好'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    fecth('/topics', 'GET', {limit:10,page:1})
      .then(res=>{
        console.log('---find res', res)
        this.setData({
          list: res
        })
      })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})