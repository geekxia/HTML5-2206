// Hooks学习，掌握React官方提供的Hooks API，掌握Hooks编程技巧，自定义封装Hooks。

// 1、Hooks，自React16.8开始新增了Hooks API

  // - 作用：用于在函数式组件中“模拟”出那些缺失的特性，比如state、生命周期、ref、上下文等。
  // - 价值：有了Hooks API，我们可以选择只使用函数式组件进行界面开发，不再使用类组件了。
  // - 注意：React官方说明了，它们并不打算淘汰类组件；Hooks API不能类组件中使用。
  // - 常用：useState、useEffect/useLayoutEffect、useContext、useReducer、useRef、useMemo、useCallback...
  // - 开源：react-use、ahooks

// 2、useState()

  // - 作用：用于在函数式组件中定义声明式变量。
  // - 语法：const [num, setNum] = useState(初始值)
  // - 关于语法思考：为什么建议用const？为什么修改num的专属方法命名名setNum？为什么用数据解构？

  // - 详解setNum这个方法：专门用于修改num这个声明式变量，语法是这样 setNum(num+1) 或 setNum(arg=>(arg+1))，注意setNum()虽然有回调函数的写法，但是它没有this.setState({}/fn, callback)那样的第二个回调。set*是异步的（如果当前环境是React17、并且set*写在宏任务或Promise.then()中，这种情况下set*是同步的）。

  // - setNum()可以触发组件更新，为什么可以更新？因为set*方法可以触发整个函数式组件重新执行，生成新Fiber树，进一步执行协调运行，接着commit提交更新DOM。
  // - 提问：既然set*可以触发当前所在的函数式组件重新执行，那么useState()定义声明式变量为什么没有重置呢？你可以理解成useState()所定义的声明式变量在React底层。


// 3、useEffect()

  // - 作用：用于在函数式组件中模拟生命周期的功能。不是模拟所有生命周期，是模拟这三个componentDidMount()/componentDidUpdate()/componentWillUnmount()生命周期钩子。

  // - 语法：useEffect(()=>{ fn1(); return fn2()}, [依赖数组])
    // - fn1()表示执行副作用。
    // - fn2()表示清除对应的副作用。

  // - useEffect()工作流程：
      // - 当没有“依赖数组”这个参数时：初始化只执行fn1()；rerender时先执行fn2()，再执行fn1()；当路由切换时只执行fn2()。
      // - 当有“依赖数组”这个参数并且是空数组时：初始化只执行fn1()；rerender时什么也不执行；当路由切换时只执行fn2()。
      // - 当有“依赖数组”这个参数并且不为空时：初始化只执行fn1()；有且仅有当“依赖数组”中的声明式变量发生变化导致rerender时，先执行fn2()，再执行fn1()；当路由切换时只执行fn2()。

  // - useEffect的使用原则：
    // - 在函数式中，不要把副作用直接暴露在函数体内，一定要使用useEffect()进行控制。
    // - 在同一个函数式组件中，可以同时使用多个useEffect()，并且彼此不干扰。
    // - useEffect()用于执行副作用，建议一个useEffect()只执行一个副作用，意思不要在同一个useEffect中同时执行多个副作用。

  // - useLayoutEffect() 运行机制和useEffect()完全一样，区别是useLayoutEffect执行时机更早。
    // - 一般很少用，在第三库中用得比较多。它也是用于执行副作用的，但不要执行ref操作和DOM操作。

import { useState, useEffect, useLayoutEffect } from 'react'

// 函数式组件
const B = props => {
  // console.log('---start')

  const [num, setNum] = useState(1)
  const [bol, setBol] = useState(true)
  const [count, setCount] = useState(0)
  const [total, setTotal] = useState(0)
  let foo = 100

  // console.log('---num', num)
  // console.log('---foo', foo)

  const add = () => {
    console.log('---1 num', num)
    setNum(num+1)
    foo += 1
    console.log('---2 num', num)
  }

  useEffect(()=>{
    // 相当于类组件的componentDidMount()
    console.log('---fn1')
    return ()=>{
      // 相当于类组件的componentWillUnmount()
      console.log('---fn2')
    }
  }, [num])
  // 这个依赖数组，相当于类组件的componentDidUpdate()
  // 如果想把这一点理解好，你首先得非常理解this.setState()/componentDidUpdate/watch这三个知识点

  // 监听num的变化
  useEffect(()=>{
    console.log('当num变化完成成，去调接口', num)
  }, [num])

  useEffect(()=>{
    // fn1
    const timer = setInterval(()=>{
      console.log('---count', count)
      // setCount(count+1)  // count就是useState()从React底层取出来的那个旧值（同步的）
      setCount(count=>(count+1))  // count是上一次setCount()之后那个旧值（异步的）
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setTotal(total+1)
    }, 1000)
    return ()=>{
      clearTimeout(timer)
    }
  }, [total])

  // 无论是初始化阶段，还是rerender阶段，都要比useEffect更早执行。
  useLayoutEffect(()=>{
    console.log('---layout fn1')
    return ()=>{
      console.log('---layout fn2')
    }
  }, [num])


  // console.log('---end')
  return (
    <div>
      <h1>学习Hooks编程</h1>
      <h1 id='n'>{ num }</h1>
      <button onClick={add}>自增</button>
      <button onClick={()=>setBol(!bol)}>切换</button>
      <hr/>

      <h1>{ count }</h1>
      <hr/>
      <h1>{ total }</h1>
    </div>
  )
}

export default B
