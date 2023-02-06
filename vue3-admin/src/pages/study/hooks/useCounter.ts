import { ref } from 'vue'

function useCounter () {
  const num = ref(100)
  const add = () => {
    num.value += 10
  }
  const sub = () => {
    num.value -= 5
  }
  return { num, add, sub }
}

export default useCounter
