// components/cate/cate.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: { type: String, value: 'hot' }
  },

  /**
   * 组件的初始数据
   */
  data: {
    cates: [
      { id: 1, label: '正在热映', value: 'hot' },
      { id: 2, label: '即将上映', value: 'future' },
      { id: 3, label: '豆瓣高分', value: 'douban' }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeCate (ev) {
      
      const cate = ev.target.dataset.cate
      console.log('---ev', cate)
      // 回传给父组件
      this.triggerEvent('change', cate)
    }
  }
})
