import { defineStore } from 'pinia'
import axios from 'axios'

// 强调：pinia要求定义store时，名称以use*开头的函数
const useCnodeStore = defineStore('cnode', {
  // 这里的state，只能使用工厂函数写法
  // 特点：在组件中可以被共享，并且具有响应式
  state: () => {
    return {
      num: 1,
      list: []
    }
  },
  // 这里的getters就是计算属性，可用于计算state，还可以对另一个getters做计算
  getters: {
    total1 () {
      return this.num * 10
    },
    total2 () {
      return this.total1 * 2
    }
  },
  // 这里的actions，可以直接修改state数据，无论是同步代码，还是异步代码。
  actions: {
    addNum (step=1) {
      this.num += step
    },
    async getList (params) {
      const res = await axios({
        url: '/api/v1/topics',
        method: 'GET',
        params
      })
      if (res.status === 200) {
        if (res.data && res.data.success) {
          this.list = res.data.data
        }
      }
    }
  }
})

export default useCnodeStore
