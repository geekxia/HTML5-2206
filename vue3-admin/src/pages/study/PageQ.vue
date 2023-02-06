<template>
  <h1>页面</h1>

  <!-- 只有当foo这个变量变化时，v-memo所包裹的视图结构才更新 -->
  <div v-memo='[foo]'>
    <h1 v-text='num'></h1>
    <button @click='num++'>自增</button>
  </div>
  <hr>

  <h1 v-text='foo'></h1>
  <button @click='foo--'>自减</button>

</template>

<script setup>
  import { ref } from 'vue'
  const num = ref(1)
  const foo = ref(1000)
</script>
