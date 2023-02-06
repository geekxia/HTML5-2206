<template>
  <h1></h1>
</template>

<script setup>
  import { ref, onBeforeMount, onMounted, onBeforeUnmount, onUnmounted, inject } from 'vue'
  const num = ref(1)

  onMounted(()=>console.log('---- mounted'))
  onBeforeMount(()=>console.log('---- before mount'))

  const msg = inject('msg1', '大家好')
  console.log('---msg', msg)

</script>
