import { observable } from 'mobx'

// 子store
const counterStore = observable({
  // 可被共享的状态数据
  num: 0,
  // actions
  increment (payload) {
    this.num += payload
  },
  decrement (step) {
    this.num -= step
  },
  incrementAsync() {
    setTimeout(() => {
      this.num++
    }, 1000)
  }
})

export default counterStore
