// 学习目标：ref属性、ref转发

// 1、在类组件中，默认就有ref的特性，我们以类组件为宿主环境演示ref的玩法。
  // - 当ref作用在普通HTML元素上时，ref是一种快捷的DOM访问方式。
  // - 当ref作用在自定义的类组件上时，ref是当前子组件的实例对象。
  // - 当ref作用在自定义的函数式组件上时，ref会报错，怎么解决？使用React.forwardRef()进行转发，把ref作用在函数式组件的某个视图节点上。这种refs转发玩法，常用于函数式组件上，ref仍然是一种快捷的DOM访问方式。

// 2、refs转发，用于把ref指引转发到组件内部，作用在一个具体的DOM节点。
  // - 语法：const NewComponent = React.forwardRef((props, ref)=>(<div ref={ref }/ >))

// 3、怎么理解函数式组件没有ref特性？
  // - 理解：在正常情况，在函数式组件内部无法访问ref对象，即函数式组件没有ref特性。
  // - 自React16.8以后，新增了一个useRef()可以帮助我们在函数式组件中访问ref对象。

import React, { PureComponent } from 'react'

class Child1 extends PureComponent {
  render () {
    return (
      <div>
        我是子组件（1）
      </div>
    )
  }
}

const Child2 = React.forwardRef((props, ref) => {
  return (
    <div>
      <span ref={ref}>我是子组件（2）</span>
      <button >点击</button>
    </div>
  )
})


class A extends PureComponent {

  test () {
    console.log('---clicked')
    // document.getElementById('foo').style.color = 'blue'
    // this.refs.bar.style.color = 'green'

    console.log('---refs', this.refs)

    this.refs.chi2.style.color = 'blue'
  }

  render () {
    return (
      <div>
        <h1>类组件</h1>
        <div id='foo' ref='bar'>盒子</div>

        {/* 因为Child1是类组件，所以this.refs.chi1是Child1的实例对象，不是DOM */}
        <Child1 ref='chi1' />

        {/* 因为Child2是函数式组件，正常情况下ref访问会报错，要使用React.forwardRef()进行转发，所以this.refs.chi2不是Child2实例对象，它是Child2内部中的某个具体的DOM对象 */}
        <Child2 ref='chi2' />

        <button onClick={()=>this.test()}>测试</button>
      </div>
    )
  }
}

export default A
