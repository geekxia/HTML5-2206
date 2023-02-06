<template>
  <h1 v-text='num'></h1>
  <button @click='sub'>自减</button>
  <button @click='add'>自增</button>
  <hr>

  <input type="text" v-model='task' @keyup.enter='confirm' />
  <div v-for='(item,idx) in list' :key='item.id'>
    <span v-text='item.id'></span>
    <span v-text='item.task'></span>
    <button @click='delTodo(idx)'>删除</button>
  </div>
</template>

<script setup>
  import useCounter from './hooks/useCounter.ts'
  import useTodolist from './hooks/useTodolist.ts'

  const { num, add, sub } = useCounter()
  const { task, list, confirm, delTodo } = useTodolist()
</script>
