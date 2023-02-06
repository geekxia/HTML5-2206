<template>
  <h1>状态管理</h1>
  <h1 v-text='num'></h1>
  <h1 v-text='store.total1'></h1>
  <h1 v-text='store.total2'></h1>

  <button @click='add'>自增</button>
  <button @click='reset'>重置</button>
  <hr>

  <div v-for='(row,idx) in store.list' :key='row.id'>
    <span v-text='idx'></span>：
    <span v-text='row.title'></span>
  </div>
  <button @click='pageHandle(-1)'>上一页</button>
  <button @click='pageHandle(1)'>下一页</button>
</template>

<script setup>
  import useCnodeStore from './store/useCnodeStore'
  import { storeToRefs } from 'pinia'
  import { onMounted, watchEffect, ref } from 'vue'
  const page = ref(1)

  // store属性解构后，响应式失效，用storeToRefs包一层
  const { num } = storeToRefs(useCnodeStore())
  // store属性不解构，响应式没有任何问题。
  const store = useCnodeStore()
  // console.log('---store', store)

  const add = () => {
    // 修改pinia中的state数据【OK】
    // store.$patch({num: store.num + 1})

    // 使用actions方法修改pinia中的state数据
    store.addNum(10)
  }

  const reset = () => {
    store.$reset()
  }

  watchEffect(()=>{
    store.getList({page:page.value, limit:5,tab:'ask'})
  }, {flush:'pre'})

  const pageHandle = num => {
    if (page.value===1 && num===-1) return
    page.value += num
  }

  watchEffect(()=>{
    // 监听store的变化
    store.$subscribe((mutations, state)=>{
      // console.log('---mutations', mutations) // 信号
      // console.log('---state', state)  // store最新状态
      // todo something
    })
  })

  watchEffect(()=>{
    // 用于计算actions方法的执行时间
    store.$onAction(({ name, after })=>{
      const st = Date.now()
      console.log(`${name} start`, st)
      after(()=>{
        const et = Date.now()
        console.log(`${name} end`, et)
        console.log(`${name} 时间差`, et-st)
      })
    })
  })
</script>

<style lang="scss" scoped>
</style>
