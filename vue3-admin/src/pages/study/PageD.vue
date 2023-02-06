<template>
  <h1>PageD</h1>
  <h1 v-text='num'></h1>
  <button @click='num++'>自增</button>
  <button @click='add'>自增</button>
  <hr>
  <hr>
  <input type="text" v-model='name' />
</template>

<script setup>
  import { ref, isRef, unref, customRef, onRenderTracked, onRenderTriggered } from 'vue'
  const num = ref(1000)  // ref用于定义声明式变量（基本数据类型）
  console.log('---num', num.value)
  const add = () => {
    num.value++
  }

  console.log('---1', isRef(num))
  console.log('---2', isRef(num.value))
  console.log('---3', isRef('Hello'))

  console.log('---4', unref(num))
  console.log('---5', unref(num.value))
  console.log('---6', unref('World'))

  const name = customRef((track, trigger)=>{
    let value = ''
    return {
      get () {
        track()  // 如果有人访问name，就执行track()
        return value
      },
      set (val) {
        value = val
        trigger()  // 如果有人修改name，就执行trigger()
      }
    }
  })
  // 仅供在开发环境下，用于ref变量的调试
  onRenderTracked((ev)=>console.log('name被跟踪了', ev))
  onRenderTriggered((ev)=>console.log('name被修改了', ev))

</script>
