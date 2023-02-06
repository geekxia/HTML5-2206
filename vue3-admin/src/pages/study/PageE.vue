<template>
  <h1>pagee</h1>
  <h1 v-text='user.name'></h1>
  <hr>

  <h1 v-text='info1.a.b.c'></h1>
  <button @click='add1'>自增</button>
  <hr>

  <h1 v-text='info2.a.b.c'></h1>
  <button @click='add2'>自增</button>
</template>

<script setup>
  import { reactive, toRef, toRefs, isRef, shallowRef, ref, triggerRef } from 'vue'
  const user = reactive({ name: '张三', age: 10 })
  console.log('---user', user.name)

  // const name = toRef(user, 'name')
  // console.log('---name', name.value)

  const { name, age } = toRefs(user)
  console.log('---1', isRef(name))
  console.log('---2', isRef(age))

  const info1 = ref({ a: { b: { c: 3 }}})
  console.log('---3', info1.value.a.b.c)
  const add1 = () => {
    info1.value.a.b.c++
  }

  const info2 = shallowRef({ a: { b: { c: 3 }}})
  console.log('---4', info2)
  const add2 = () => {
    console.log('---clicked')
    // info2.value = { a: { b: { c: 1000 }}}
    // info2.value.a = { b: { c: 500 }}
    info2.value.a.b.c++
    triggerRef(info2)
  }

</script>
