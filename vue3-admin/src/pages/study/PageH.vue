<template>
  <h1>页面</h1>
  <h1 v-text='num'></h1>
  <button @click='num++'>自增</button>
  <hr>
  <h1 v-text='foo'></h1>
  <button @click='foo--'>自减</button>
  <hr>
  <h1 v-text='bar.a'></h1>
  <button @click='bar.a++'>改变</button>
</template>

<script setup>
  import { watchEffect, ref, reactive } from 'vue'
  const num = ref(1)
  const foo = ref(200)
  const bar = reactive({a:1,b:2})

  // watchSyncEffect()
  const stop1 = watchEffect(()=>{
    console.log('---执行副作用 2', bar.a)
  }, {flush:'sync'})

  // watchPostEffect()
  const stop2 = watchEffect(()=>{
    console.log('---执行副作用 3', foo.value, num.value)
  }, {flush:'post'})

  // 自动依赖收集
  const stop3 = watchEffect(()=>{
    console.log('---执行副作用 1', foo.value)
  }, {flush:'pre'})

</script>
