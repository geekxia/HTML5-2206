// 4、useContext()
  // - 默认在函数式组件中是没有上下文。
  // - 作用：在函数式组件使用上下文，给你一个访问上下文的入口。
  // - 语法：const ctx = useContext(上下文对象)

// 5、useRef()
  // - 默认在函数式组件中是没有ref特性的。
  // - 作用：在函数式组件中使用ref，给你一个访问ref的入口。
  // - 语法：const box = ref()  // box.current代表就是那个DOM节点

// 6、useMemo()
  // - 作用：用于性能优化，把那些比较耗费性能的计算进行缓存。
  // - 语法：const memoizedValue = useMemo(computeExpensiveValue(a,b,c), [依赖数组])
  // - 特点：有且仅有当“依赖数组”的声明式变量发生变化时，useMemo()才会重新执行那个昂贵的计算。
  // - 注意：useMemo()的第二个参数是“依赖数组”，也有三种写法，和useEffect的玩法一样。

// - 7、useCallback()
  // - 作用：用于性能优化，用于缓存一个函数声明。
  // - 语法：const fn = useCallback(()=>{}, [依赖数组])
  // - 替代方案：const fn = useMemo(()=>{return ()=>{}}. [依赖数组])

import React, { useContext, useRef, useMemo, useState, useCallback } from 'react'

const QfContext = React.createContext()
const { Provider, Consumer } = QfContext

function B (props) {
  const ctx = useContext(QfContext)
  const box = useRef()
  const foo = useRef()
  const [num, setNum] = useState(100)

  const total = useMemo(()=>{
    // do something 复杂的计算
    console.log('---发生了计算')
    return (1 + 2 + 3 + 4) * num
  }, [num])

  const handle1 = useCallback(
    () => {
      box.current.style.color = 'red'
      console.log('---foo', foo)
      console.log('---box', box)
    },
    []
  )

  const handle2 = useMemo(()=>{
    // 计算属性的返回值是一个函数类型
    return () => {
      box.current.style.color = 'red'
      console.log('---foo', foo)
      console.log('---box', box)
    }
  }, [])

  return (
    <div>
      <h1>学习Hooks编程</h1>
      <h1>{ ctx }</h1>
      <h1 ref={box}>文字</h1>
      <div ref={foo}>你好</div>
      <button onClick={handle2}>测试ref操作</button>
      <hr/>
      <h1>{ num }</h1>
      <h1>{ total }</h1>
      <button onClick={()=>setNum(num+1)}>自增</button>
    </div>
  )
}


export default () => {
  return (
    <Provider value={'千锋教育'}>
      <B />
    </Provider>
  )
}
