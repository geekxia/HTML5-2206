
// 8、useReducer()
  // - 作用：在React函数式组件内部模拟Redux数据流。好处是一个useReducer可以替代多个useState()，因为useState()一次只能定义一个声明式变量，useReducer()一次性定义多个声明式变量。
  // - 语法：const [state, dispatch/forceUpdate/setState] = useReducer(reducer, {初始值})
  // - 扩展：以后大家学了Redux状态管理，再理解这个hooks就容易了。

import { useReducer } from 'react'

// 纯函数（不对入参做修改，相同入参会得到相同结果）
const reducer = (state, action) => {
  // 对state进行深复制
  // 直接对深复制过的state进行增删改查
  // 返回修改后的state
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'NUM_ADD':
      newState.num += action.payload
      break
    case 'NUM_SUB':
      newState.num -= action.payload
      break
    case 'TODO_ADD':
      newState.list.push(action.payload)
      break
    default:
  }
  return newState
}

// 声明式数据源
const initState = {
  num: 1,
  list: [],
  info: {},
  flag: true
}

function B (props) {
  const [state, dispatch] = useReducer(reducer, initState)

  console.log('---state', state)

  return (
    <div>
      <h1>学习Hooks编程</h1>
      <h1>{ state.num }</h1>
      <button onClick={()=>dispatch({type:'NUM_ADD',payload:1})}>自增</button>
      <button onClick={()=>dispatch({type:'NUM_SUB',payload:2})}>自减</button>
    </div>
  )
}

export default B
