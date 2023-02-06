<template>
  <h1>页面</h1>
  <hr>

  <!-- v-model = :modelValue + @update:modelValue -->
  <!-- v-model:gender = :gender + @update:gender -->
  <!-- v-model:xxx = :xxx + @update:xxx -->

  <!-- <ChildC :modelValue='lang' @update:modelValue='lang=$event' /> -->
  <ChildC v-model.trim='lang' v-model:gender.qf.sz='gender' />
</template>

<script setup>
  import ChildC from '@/components/ChildC.vue'
  import { ref } from 'vue'
  const lang = ref('zh')
  const gender = ref('unknow')
</script>
