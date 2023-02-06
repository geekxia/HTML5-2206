// 学习生命周期、响应式原理（Fiber架构）

// 1、只有类组件才有生命周期钩子函数，函数式组件没有生命周期钩子函数。

// 2、生命周期（3-2-1）
//   - 装载阶段（3） constructor() / render() / componentDidMount()
//   - 更新阶段（2） render() / componentDidUpdate() / [shouldComponentUpdate()开头]
//   - 卸载阶段（1） componentWillUnmount()

// 3、面试题：shouldComponentUpdate()
// - 返回true时，正常执行更新阶段；返回false时，不执行更新阶段。
// - this.$forceUpdate()这个方法调用，会绕过shouldComponentUpdate()，一定进入更新阶段。
// - shouldComponentUpdate()，一般以用于性能调优，阻塞掉那些不参与视图渲染的变量更新导致的Fiber生成。
// - shouldComponentUpdate()只有在类组件Component中才有，在PureComponent中没有。
// - 无论是shouldComponentUpdate()，还是PureComponent，都在解决相似的性能问题。

// 4、React组件的渲染（更新）流程，由两个阶段构成，一个是render阶段、一个是commit阶段。
  // - render阶段，目标是生成Fiber树，这个过程是异步的、可中断的，并且不执行任何副作用。中不中断，得看浏览器主线程的脸色。
  // - commit阶段，目标是把协调运算的结果，一次性提交渲染或更新成真实DOM。这个过程在React(v17)中是不可中断的，在React(v18)中可以人为中断（由startTransition进行中断）。

// 5、谈一谈React响应式原理（Fiber架构）
  // - 什么是Fiber单元？每一个JSX元素节点都是一个Fiber单元（React.createElemnt()的返回值）
  // - 这些独立的Fiber单元，是怎么串联成Fiber树？给每个Fiber单元添加三个指针（child、sibling、parent）
  // - 为什么React要把构建这个复杂的Fiber树？为了让协调运算、commit阶段可以循环执行，而不是递归。
  // - 怎么执行协调运算？每个Fiber单元上，还有一个 alternater 指针，指向旧Fiber中的自己。如果新Fiber树中存在，但旧Fiber树不存在，说明新增节点；如果新Fiber树中不存在，但旧Fiber树存在，说明这个节点是要删除的节点；如果在新旧Fiber树中都存在这个节点，进一步遍历新旧节点的属性，对比它们的变化情况。
  

import { Component } from 'react'

class A extends Component {
  // constructor()
  // 是钩造器，当组件实例化时会执行这个钩子。
  // 注意1：不要把props数据流和state数据流相互赋值，在整个组件中props数据流和state数据必须保持独立。
  // 注意2：不要直接修改props，props是不能改了。
  // 注意3：在constructor()中，不能调用this.setState()方法。
  // 注意4：在constructor()中，不要在这里调接口、不要做DOM操作。。。不要这里写业务逻辑。
  constructor (props) {
    super(props)  // 调用父类的构造器函数，这是面向对象语法的要求
    // super(props)必须是构造函数的第一行代码
    // 在这里定义声明式变量
    this.state = {
      num: 1,
      count: 0,
      list: [],
      info: {}
    }
    console.log('---constructor')
  }

  // componentDidMount()
  // 相当于Vue中mounted()，表示页面第一次渲染完成。
  // 一般调接口、定时器、DOM操作，都可以在这里编写业务逻辑。
  componentDidMount () {
    console.log('---componentDidMount')
  }

  // shouldComponentUpdate()
  // 特点：它是一个控制更新阶段的“开关”，当它返回true时正常执行更新阶段，如果它返回false则不进入更新阶段。
  // 作用：是React官方提供的一种性能优化方案。
  shouldComponentUpdate (props, state) {
    console.log('---shouldComponentUpdate')
    console.log('---props', props)
    console.log('---state', state)
    return true
  }

  // componentDidUpdate()
  // 相当于Vue中的updated()， 表示页面再次渲染成功。
  // 相当于 this.setState({}/fn, callback) 的callback，以后咱们在监听一个声明式变量的变化时，不建议使用this.setState()的callback，建议使用componentDidUpdate()，这相当于Vue中的watch功能。
  // 在componentDidUpdate()可以调用this.setState()方法, 但必须给终止条件，不能让更新阶段产生无限死循环。
  componentDidUpdate (props, state) {
    console.log('---componentDidUpdate')
    // console.log('---state', state)
    // console.log('---props', props)

    // 监听count以外的其它声明式变量的变化
    if (state.count === this.state.count) {
      this.setState(state=>({count: state.count+1}))
    }

    // 只监听num的变化
    if (state.num !== this.state.num) {
      console.log('---num changed')
    }
  }

  // componentWillUnmount()
  // 相当于Vue中的beforeDestroy()，表示当前组件即将销毁。
  // 一般在这里清缓存、清除定时器、关闭长连接。。
  componentWillUnmount () {
    console.log('---componentWillUnmount')
  }

  add () {
    // 这个操作，会触发re-render
    this.setState(state=>({num: state.num+1}))
  }

  // render()
  // 作用：用于返回视图结构，背后是生成一棵Fiber树（暂时先理解成是虚拟DOM）。
  // 注意：在render()内部，不能调用 this.setState()，特别小心！
  // 流程：当render()调用，会生成一棵Fiber树（双向链表结构），这个过程是异步的，并且是可中断的，直到Fiber树创建完成为止；接着执行协调运算（类比Diff运算）；接着进入commit提交阶段，一次性提交Fiber更新DOM。
  // 这是类组件必须得有的一个生命周期钩子，在挂载阶段和更新阶段都会执行。
  render () {
    console.log('---render')
    // do something
    const { num, count } = this.state

    return (
      <div>
        <h1>类组件: 更新阶段执行了 { count } 次</h1>
        <h1>{ num }</h1>
        <button onClick={()=>this.add()}>自增</button>
      </div>
    )
  }
}

export default A
