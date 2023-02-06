// 学习state声明式

// 1、如何定义state？
  // - 在类组件中，在constructor()中使用this.state={}来定义；
  // - 在函数式中，自React16.8以后可以使用useState()来定义。

// 2、如何使用state？
  // - 在类组件中，通过this.state来访问声明式变量；
  // - 在函数式组件中，直接访问useState的结果。

// 3、如何正确地修改state声明式变量？
  // - 在类组件中，使用专属方法this.setState()来修改；
  // - 在函数式组件中，使用useState()返回值的第二个参数(set*方法)来修改。

// 4、详解 this.setState()的两种写法
  // - this.setState({}, callback)  当我们修改state时，如果新值与旧值无关，建议使用这种写法。
  // - this.setState((state,props)=>{}, callback) 当我们修改state时，如果新值与旧值有关，建议使用这种写法。

// 5、详解 this.setState()的异步性
  // - 在React(V17/V16)中，this.setState()在合成事件(on*系列事件、生命周期)中，是异步的；在宏任务、Promise.then()中是同步的。
  // - 在React(V18)中，无论this.setState()在哪里，都是异步的。这种特性，被称之为“并发模式”。
  // - 为什么是要把this.setState()这个语句定义成异步的呢？为了性能优化。

// 6、详解 this.setState()的自动合并
  // - 什么是this.setState()的自动合并呢？在同一个函数域中，多个this.setState()会自动合并，以减少没有必要的Diff运算（协调运算）。
  // - 自动合并的规则：是一种浅合并。

// 7、事件绑定说明
  // - 在类组件中，使用 <div onEventName={this.handler.bind(this, 10)} />， 还可以使用 <div onEventName={()=>this.handler(10)} />
  // - 在函数式组件中，只能使用箭头函数的方式绑定。
  // - 补充：事件绑定，怎么拿到事件对象、事件传参呢？在“表单绑定”中再讲解。
  // - 什么是合成事件？on*系列的事件处理器、生命周期钩子，都是合成事件。在“生命周期”中再详解。

import { Component, useState } from 'react'

class A extends Component {

  constructor (props) {
    super(props)  // 调用Component的构造函数
    // 定义state
    this.state = {
      num: 1,
      foo: 100,
      name: '张三',
      bar: 200,
      cate: '',
      bol: true,
      list: []
    }
  }

  // 自定义方法（事件处理器）
  add () {
    // console.log('---clicked', this)

    console.log('1--- num', this.state.num)

    // 【错！！】为什么这段代码不好？因为你直接修改了state，又使用this.setState()间接修改state。
    // this.setState({
    //   num: ++this.state.num
    // })

    // 【对！不优雅！！】这种写法是没有问题的，但不够优雅。因为你要修改的state新值是由旧值计算而来的。
    // 当state新值是由旧值计算而来时，建议使用 this.setState((state,props)=>{})这种语法。
    // this.setState({
    //   num: this.state.num + 1
    // })

    // 【对！！优雅！！】
    // this.setState((state,props)=>{
    //   return {
    //     num: state.num + 1  // 用旧值参与运算，得到新值
    //   }
    // }, ()=>console.log('3--- num', this.state.num))

    // 【对！！优雅！！】
    this.setState(state=>({num: state.num + 1}), ()=>{console.log('3--- num', this.state.num)})

    console.log('2--- num', this.state.num)
  }

  sub () {
    // 如果这段代码写在V17中，this.setState()是同步的，打印结果是100-98-96-96
    // 如果这段代码写在V18中，this.setState()仍然是异步的，打印结果是100-100-96-96
    setTimeout(()=>{
      console.log('1--- foo', this.state.foo)
      this.setState(state=>({foo: state.foo-2}), ()=>console.log('3--- foo', this.state.foo))
      this.setState(state=>({foo: state.foo-2}), ()=>console.log('4--- foo', this.state.foo))
      console.log('2--- foo', this.state.foo)
    }, 0)
  }

  update () {
    setTimeout(()=>{
      // do something
      this.setState({ name: '李四' })
      // do something
      this.setState( state=>({bar: state.bar - 10}))
      // do something
      this.setState({ name: '王五' })
      // do something
      this.setState(state=>({
        name: '赵六',
        bar: state.bar + 20
      }))
    }, 0)
  }


  // 一定要有render()，因为render()返回值是视图结构
  render () {
    // do something
    const { num, foo, name, bar } = this.state

    console.log('---render')

    return (
      <div>
        <h1>类组件</h1>
        <h1>{ num }</h1>
        {/* 使用ES5的方式，绑定事件 */}
        <button onClick={ this.add.bind(this) }>自增[ES5]</button>
        {/* 使用ES6的方式，绑定事件 */}
        <button onClick={ ()=>this.add() }>自增[ES6]</button>
        <hr/>

        <h1>{ foo }</h1>
        <button onClick={()=>this.sub()}>自减</button>
        <hr/>

        <h1>{ name }</h1>
        <h1>{ bar }</h1>
        <button onClick={()=>this.update()}>更新</button>

      </div>
    )
  }
}

function B (props) {
  // 定义state声明式变量
  let [num, setNum] = useState(1)
  const [list, setList] = useState([])

  const add = () => {
    console.log('1--- num', num)
    // 如果这里是React(V17)中，在合成事件中是异步的，如果在宏任务或Promise.then()是同步的。
    // 如果这里是React(18)，无论在哪里都是异步的。
    // useState()给的这种set*方法，是没有callback的。
    // setNum(num + 1)
    setNum(num => num + 10)
    console.log('2--- num', num)
  }

  return (
    <div>
      <h1>函数式组件</h1>
      <h1>{ num }</h1>
      <button onClick={add}>自增</button>
    </div>
  )
}

export default B
