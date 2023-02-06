<template>
  <h1>页面</h1>
  <ChildB :a='1' b :c='list' />
</template>

<script setup>
  import ChildB from '@/components/ChildB.vue'
  import { reactive, provide } from 'vue'
  const list = reactive([1,2,3])
  const info = reactive({a:1,b:2})

  provide('list', [4,5,6])
  provide('info', {c:3,d:4})
</script>
