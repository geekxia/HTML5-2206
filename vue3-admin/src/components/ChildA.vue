<template>
  <h1>子组件</h1>
  <div class='page'>
    <span v-for='i in arr' v-text='i' :class='{"on":value===i}' @click='emit("change", i)'></span>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits, toRefs, computed } from 'vue'
  // 接收自定义属性。在选项式写法中，使用props选项来接收。
  const props = defineProps({
    value: { type: Number, default: 0 }
  })
  // 接收自定义事件。在选项式写法中，使用emits选项来接收。
  const emit = defineEmits(['change'])

  // props一旦被解构，响应式就失效了，建议使用toRefs包起来。
  const { value } = toRefs(props)

  const arr = computed(()=>{
    const v = value.value
    if (v <=3) return [1,2,3,4,5]
    else return [v-2, v-1, v, v+1, v+2]
  })

  // const click = (i) => {
  //   emit('change', i)
  // }
</script>

<style lang='scss' scoped>
.page {
  span {
    padding: 20px;
    cursor: pointer;
  }
  span.on {
    color: red;
  }
}
</style>
