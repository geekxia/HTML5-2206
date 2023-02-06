// index.js
const fetch = require('../../utils/request')
Page({
  data: {
    num: 1,
    list: [
      { id: 1, name: '张三', age: 10 },
      { id: 2, name: '李四', age: 10 },
      { id: 3, name: '王五', age: 10 }
    ],
    row: 1,
    h: 20,
    box: 'wrap',
    name: '',
    cate: 'douban'
  },
  onLoad (opt) {
    console.log('---接收路由参数', opt)
  },
  onReady () {
    console.log('---index mounted')
    fetch('/topics', 'GET', {})
  },
  // 事件处理器
  submit () {
    console.log('-提交')
  },
  add () {
    this.setData({
      num: this.data.num + 1
    })
  },
  rowHandle () {
    this.setData({
      row: (this.data.row + 1) % 3
    })
  },
  hplus (ev) {
    console.log('---ev', ev)
    this.setData({
      h: this.data.h + 10
    })
  },
  rowSkip (ev) {
    console.log('---', ev.target.dataset.row)
  },
  getName (ev) {
    console.log('---ev', ev)
    this.setData({
      name: ev.detail.value
    })
  },
  start () {
    this.animate(
      '#foo', 
      [
        // 能使用哪些动画属性呢？参见文档！
        { opacity: 1.0, rotate: 0, backgroundColor: '#FF0000', scale:[1,1]  },
        { opacity: 0.5, rotate: 45, backgroundColor: '#00FF00', scale:[0.5, 0.5]},
        { opacity: 0.1, rotate: 70, backgroundColor: '#0000FF', scale: [0.2, 0.2] },
        // 动画最后一帧的样式，默认是保留的。
      ],
      5000,
      // 动画执行结束
      () => {
        this.clearAnimation(
          '#foo',
          // 用于指定要清除的动画样式
          { opacity: true, backgroundColor: true, scale: true },
          () => {
            console.log('动画清除成功')
          }
        )
      }
    )
  },
  getCate (ev) {
    this.setData({cate: ev.detail})
  }
})
