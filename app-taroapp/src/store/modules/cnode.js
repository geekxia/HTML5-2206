import { observable } from 'mobx'
import Taro from '@tarojs/taro'
import { fetchCnode } from '../../utils/request'

export default observable({
  list: [],
  getList (params) {
    fetchCnode(params).then(res=>{
      console.log('---文章列表', res)
      this.list = [...this.list, ...res]
      if (params.page ===1) {
        // 停止下拉刷新卡顿效果
        Taro.stopPullDownRefresh()
      }
    })
  },
  resetList () {
    this.list = []
  }
})
