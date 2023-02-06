<template>
  <h1>子组件</h1>
</template>

<script setup>
  import { defineProps, inject } from 'vue'
  const props = defineProps({
    a: { type: Number, default: 0 },
    b: { type: Boolean, default: false },
    // 如果自定义属性是引用数据类型，default建议使用如下写法（工厂函数）
    c: {
      type: Array,
      default () {
        return inject('list', [])
      }
    },
    d: {
      type: Object,
      default () {
        return inject('info', {name:'张三',age:10})
      }
    }
  })
  console.log('---child b props', props)
</script>
