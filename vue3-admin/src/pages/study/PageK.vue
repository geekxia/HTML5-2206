<template>
  <div>
    <!-- 注：当父组件有传递class和style时，这里只能使用单一根节点 -->

    <h1>页面</h1>
    <!-- 使用自定义指令 -->
    <h1 v-login='num'></h1>
  </div>
</template>

<script setup>
  import { useAttrs, ref } from 'vue'
  const num = ref(100)

  const attrs = useAttrs()  // 父组件传递过来的自定义属性们
  console.log('---attrs', attrs)
</script>
