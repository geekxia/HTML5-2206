<template>
  <!-- ref属性和v-for一起使用，需要手动封装方法来收集这些DOM -->
  <div v-for='i in 5' :key='i' v-text='i' :ref='collect'></div>

  <!-- ref属性使用单一节点上，需要声明一个ref对象来接收DOM -->
  <h1 ref='hello'>你好</h1>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  const hello = ref()
  const arr = []
  const collect = ref => {
    if (ref) arr.push(ref)
  }

  console.log('---arr', arr)
  console.log('---hello', hello)

  onMounted(()=>{
    arr[2].style.color = 'red'
    hello.value.style.color = 'blue'
  })

</script>
