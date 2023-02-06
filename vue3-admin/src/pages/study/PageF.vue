<template>
  <h1 v-text='user.a'></h1>
  <hr>
  <h1 v-text='yy2.e'></h1>
  <button @click='add'>自增</button>
  <hr>
  <h1 v-text='zz.a.b.c'></h1>
  <button @click='test'>修改</button>
  <hr>

  <h1 v-text='mm.a.b.c'></h1>
  <h1 v-text='mm.d'></h1>
  <button @click='change'>改变</button>
</template>

<script setup>
  import { reactive, readonly, isReadonly, isReactive, ref, isProxy, toRaw, markRaw, shallowReactive, shallowReadonly } from 'vue'

  const uu = { a: 1, b: 2 }
  const user = reactive(uu)  // isReactive = true

  const info = readonly({ c: 3, d: 4 })  // isReactive = false
  const user2 = readonly(user)  // isReactive = true
  const foo = ref(100)
  const foo2 = readonly(foo)    // isReactive = false

  const xx = 100

  console.log('---1', isReadonly(info))
  console.log('---2', isReadonly(xx))

  console.log('---3', isReactive(user))
  console.log('---4', isReactive(user2))
  console.log('---5', isReactive(foo2))

  console.log('---6', isProxy(user))
  console.log('---7', isProxy(info))
  console.log('---8', isProxy(user2))

  console.log('---10', toRaw(user) === uu)
  console.log('---11', user === uu)

  const yy = markRaw({ e: 6, f: 7 })

  const yy2 = reactive(yy)
  console.log('---12', isReactive(yy2))
  const add = () => {
    console.log('---clicked')
    yy2.e++
  }

  const zz = shallowReactive({ a: { b: { c: 1 }}})
  const test = () => {
    // zz.a = { b: { c: 2 }}
    zz.a.b.c++
  }

  const mm = shallowReadonly(reactive({a:{b:{c:1}}, d:2}))
  const change = () => {
    // mm.d++  // 不能改
    mm.a.b.c++  // 可以改
  }
</script>
