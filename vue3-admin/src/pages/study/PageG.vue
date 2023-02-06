<template>
  <h1 v-text='num'></h1>
  <button @click='num++'>自增</button>
  <input type="text" v-model.number='total' />
  <button @click='stopAll'>停止一切监听</button>
</template>

<script setup>
  import { ref, computed, watch } from 'vue'
  const num = ref(100)
  const total = computed({
    get () {
      return num.value * 100
    },
    set (val) {
      num.value = val / 100
    }
  })

  const stop1 = watch(num, (newNum, oldNum)=>{
    console.log('---num changed', newNum, oldNum)
  })

  const stop2 = watch([num, total], ([newNum, newTotal], [oldNum, oldTotal])=>{
    console.log('---new', [newNum, newTotal])
    console.log('---old', [oldNum, oldTotal])
  })

  const stopAll = () => {
    stop1()
    stop2()
  }
</script>

<style lang="css" scoped>
</style>
