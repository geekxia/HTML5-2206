<template>
  <h1>测试组件通信</h1>

  <!-- 注：在V3中，v-model = v-bind:modelValue + v-on:update:modelValue -->
  <ChildA :value='page' @change='page=$event'></ChildA>
</template>

<script setup>
  import ChildA from '@/components/ChildA.vue'
  import { ref, getCurrentInstance, inject, nextTick } from 'vue'
  const page = ref(1)
  // const change = ev => {
  //   console.log('---收到了孩子的数据', ev)
  //   page.value = ev
  // }

  const app = getCurrentInstance()
  console.log('--app', app)

  const $url = inject('$url')
  console.log('---$url', $url)

  // const add = () => {
  //   content.value = '<div id="box"></div>'
  //   nextTick(()=>{
  //     document.getElementById('box')
  //   })
  // }


</script>
