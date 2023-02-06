<template>
  <!-- 穿梭框，把内部元素插入to属性所对应的DOM节点中去 -->
  <teleport to='head'>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.min.css"
    />
  </teleport>
  <div>
    <transition
      enter-active-class='animate__animated animate__bounce'
      leave-active-class='animate__animated animate__backOutDown'
      mode='out-in'
    >
      <h1 v-if='bol'>白天</h1>
      <h1 v-else>黑夜</h1>
    </transition>
  </div>
  <button @click='toggle'>切换</button>

  <teleport to='body'>
    <h1>你好</h1>
  </teleport>

</template>

<script setup>
  import { ref } from 'vue'
  const bol = ref(true)

  const toggle = () => {
    bol.value = !bol.value
  }
</script>

<style>
  .qf-enter-from {
    opacity: 0;
    color: red;
  }
  .qf-enter-active {
    transition: all ease 2s;
  }
  .qf-enter-to {
    opacity: 1;
    color: black;
  }

  .qf-leave-from {
    opacity: 1;
    color: black;
  }
  .qf-leave-active {
    transition: all ease 2s;
  }
  .qf-leave-to {
    opacity: 0;
    color: blue;
  }
</style>
