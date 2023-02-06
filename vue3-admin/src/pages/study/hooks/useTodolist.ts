import { ref, reactive } from 'vue'

function useTodolist () {
  let task = ref('')
  let list = reactive([])
  let confirm = () => {
    if (task.value) {
      list.push({id: Date.now(), task: task.value })
      task.value = ''
    }
  }
  
  const delTodo = (idx) => {
    list.splice(idx, 1)
  }
  return { task, list, confirm, delTodo }
}

export default useTodolist
