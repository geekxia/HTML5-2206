// 学习两种组件定义

import { Component, useState, useEffect, useRef } from 'react'

// 一、类组件（class组件）
// 特点：用ES6面向对象语法，有生命周期、有this、有state、有上下文、有ref，永远不能使用Hooks。
// 缺点：相对函数式组件来讲，性能较差。
// 开发：相对函数式组件的写法，显示很啰嗦。
class A extends Component {
  constructor (props) {
    super(props)
    // 定义声明式变量
    this.state = {
      num: 1
    }
  }
  componentDidMount () {
    console.log('---页面渲染完成')
    this.refs.box.style.color = 'red'
  }
  componentDidUpdate () {
    console.log('---页面更新完成')
  }
  add () {
    this.setState((state)=>({num: state.num+1}))
  }
  // 成员方法
  render () {
    console.log('---render/rerender')
    console.log('---props', this.props)
    const { num } = this.state
    // 返回视图模板（JSX）
    return (
      <h1 ref='box'>类组件 {num} <span onClick={()=>this.add()}>自增</span></h1>
    )
  }
}

// 二、函数式组件（自React诞生本来就有这种写法）
// 特点：用函数式编程，没有生命周期、没有state、没有this、没有上下文、没有ref、自React(16.8)以后可以使用Hooks。
// 优点：相对于类组件，性能更好。
// 版本：自React(16.8)后，React新增了Hooks API，在函数式组件中使用Hooks API模拟上述缺失的特性。

// 注意1：无论是类组件，还是函数式组件，它们都有props(父子通信的纽带)，在类组件中使用this.props访问，在函数式组件中它的入参就是props。
// 注意2：在React(16.8)以前，是没有Hooks的。只有在React(16.8)以后，才新增了Hooks。
function B (props) {
  console.log('---props', props)
  // 模拟state声明变量
  const [num, setNum] = useState(1)
  // 使用ref
  const box = useRef(null)
  // 模拟生命周期
  useEffect(()=>{
    console.log('---页面渲染/更新完成')
    if (num === 1) {
      box.current.style.color = 'blue'
    }
  }, [num])

  return (
    <h1 ref={box}>函数式组件 {num} <span onClick={()=>setNum(num+10)}>自增</span></h1>
  )
}

export default B
