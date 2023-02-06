<template >
  <h1 class='box'>页面</h1>
  <button @click='change'>改变</button>
  <hr>

  <h1 :class='zz'>测试</h1>
  <button @click='changeZZ'>改变</button>
</template>

<script setup>
  import { ref, useCssModule } from 'vue'
  const style = useCssModule()
  console.log('---style', style)
  const qfstyle = useCssModule('qf')
  console.log('----qfstyle', qfstyle)

  const cc = ref('red')
  const ff = ref(20)
  const zz = ref(qfstyle.r1)

  const change = () => {
    cc.value = 'blue'
  }
  const changeZZ = () => {
    zz.value = qfstyle.r2
  }
</script>

<style lang="scss" module>
// 在style标签中，只能使用v-bind
.box {
  color: v-bind(cc);
}
.r1 {
  color: orange;
}
</style>

<style scoped module='qf'>
.r1 { color: red; }
.r2 { color: blue; }
.r3 { color: green; }
</style>
