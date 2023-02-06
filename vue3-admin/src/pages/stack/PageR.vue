<template>
  <h1>路由学习</h1>
  <el-button type="primary">点击</el-button>
</template>

<script setup>
  import { useRoute, useRouter, useLink } from 'vue-router'
  const route = useRoute()  // 相当于选项式组件中的this.$route.query/params/fullpath...
  const router = useRouter()  // 相当于选项式组件中的this.$router.push/replace/back()

  console.log('---route', route)
  console.log('---router', router)
</script>
