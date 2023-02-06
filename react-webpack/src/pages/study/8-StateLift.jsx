// 学习状态提升（相当于Vue中的父子组件通信）

// 1、在React中一般不谈论自定义属性和自定义事件，所有用在组件上的属性都叫做props。props可以是基本数据类型、还可以对象和数据，还可以是函数，还可以是JSX元素。

// 2、当props是事件函数时，props的名字建议以 on* 开头。如果props不是事件函数，是渲染函数时，建议不要以 on*开头。
  // 像这样 <Modal footer={()=>(<footer />)}, onConfirm={()=>{}} />

// 3、什么是状态提升？当两个组件需要共享一个状态变量时，我们要找到它们最近的父组件，把这个需要共享的状态变量定义在这个父组件中。它的语法基础就是props（父子组件通信）。

import { Component, useState } from 'react'

class Fahrenheitn extends Component {
  change (ev)  {
    const { onChange } = this.props
    // 回传父组件需要的摄氏温度
    const temper = (Number(ev.target.value) - 32 ) * 5/9
    onChange(temper)
  }
  render () {
    console.log('---Fahrenheitn props', this.props)
    const { value } = this.props
    return (
      <div>
        <label>华氏温度：</label>
        <input type="text" value={value*9/5+32} onChange={ev=>this.change(ev)}/>
      </div>
    )
  }
}

function Celsius (props) {
  console.log('---Celsius props', props)
  const { value, onChange } = props
  const change = (ev) => {
    console.log('---', ev.target.value)
    // 取出事件对象中的最新值，回传给父组件
    onChange(Number(ev.target.value))
  }
  return (
    <div>
      <label>摄氏温度：</label>
      <input type="text" value={value} onChange={change} />
    </div>
  )
}


function B () {
  const [temper, setTemper] = useState(0)  // 这个就是被我们提升的状态
  return (
    <div>
      <Fahrenheitn value={temper} onChange={ev=>setTemper(ev)} />
      <hr/>
      <Celsius value={temper} onChange={ev=>setTemper(ev)} />
    </div>
  )
}

export default B
