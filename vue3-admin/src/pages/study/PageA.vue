<template>
  <h1>PageA</h1>
  <h1 v-text='num'></h1>
  <h1 v-text='total'></h1>
  <button @click='add'>自增</button>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue'
// Vue3的选项写法：对Vue2范式完全兼容，可以同时使用setup和选项，也可只使用setup。
// 官方已经不推荐使用这种选项写法了。选项写法，都有对应的组合API来实现。
// 解读setup这个选项：相当于Vue2中的created()，可以理解成是组件生命周期的第一阶段；setup(props,context)，context表示上下文，为什么在setup中要有一个上下文对象，因为在setup选项中没有this。
export default {
  props: {
    xx: { type: String, default: '' }
  },
  // 组合选项
  setup (props, context) {
    console.log('---props', props)
    console.log('---context', context)
    const num = ref(1)
    const add = () => {
      num.value++
    }
    onMounted(()=>console.log('--- 1 a mounted'))
    watch(num, ()=>console.log('--- 1 num changed'))
    const total = computed(()=>num.value*100-2)
    return {
      num,
      add,
      total
    }
  },
  mounted () {
    console.log('--- 2 a mounted')
  },
  watch: {
    num () {
      console.log('--- 2 num changed')
    }
  },
  computed: {
    // total () {
    //   return this.num * 100 -2
    // }
  },
  // methods: {
  //   add () {
  //     this.num++
  //   }
  // }
}
</script>
