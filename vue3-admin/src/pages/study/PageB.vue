<template>
  <h1>PageB</h1>
  <h1>{{num}}</h1>
  <button @click='add'>自增</button>
</template>

<script setup>
  // 在Vue中，怎么规避选项式写法？在<script setup>，这种在script上添加setup是Vue3组合式写法的语法糖。
  // Vue3组合式写法（并且是官方推荐的语法糖）
  import { ref } from 'vue'
  const num = ref(1000)
  const add = () => {
    num.value++
  }
</script>
