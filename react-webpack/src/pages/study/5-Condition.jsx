// 学习条件渲染

// 1、单一元素的条件渲染，语法 { bol && <jsx /> }， 这就相当于v-if
// 2、两个元素的条件渲染，语法 { bol ? <jsx1 /> : <jsx2 /> }，这相当于v-if / v-else
// 3、多个元素的条件渲染，建议封装自定义渲染函数，比如 function renderSomething (...arg) { return (<jsx/>) }, 这相当于v-if/v-else-if/v-else
// 4、使用display:none来实现元素的显示与隐藏，语法 <style={{display:(bol?'block':'none')}} jsx />, 这相当于v-show

import { Component, useState } from 'react'

class A extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bol1: true,
      bol2: true,
      num: 0,
      bol3: true
    }
  }

  renderRow () {
    const { num } = this.state
    // do something
    let result = null
    if (num === 0) {
      result = <h1>第一行</h1>
    } else if (num === 1) {
      result = <h1>第二行</h1>
    } else {
      result = <h1>第三行</h1>
    }
    return result
  }

  render () {
    const { bol1, bol2, bol3 } = this.state
    return (
      <div>
        <h1>类组件</h1>
        <hr/>
        {
          bol1
            && (
              <div>
                <h1>千锋教育</h1>
                <h1>深圳校区</h1>
              </div>
            )
        }
        <button onClick={()=>this.setState(_=>({bol1: !_.bol1}))}>显示/隐藏</button>
        <hr/>
        {
          bol2
            ? <h1>北京校区</h1>
            : <h1>深圳校区</h1>
        }
        <button onClick={()=>this.setState(_=>({bol2: !_.bol2}))}>切换</button>
        <hr/>

        { this.renderRow() }
        <button onClick={()=>this.setState(_=>({num: (_.num+1)%3}))}>切换</button>
        <hr/>

        <h1 style={{display:(bol3?'block':'none')}}>广州校区</h1>
        <button onClick={()=>this.setState(_=>({bol3: !_.bol3}))}>切换</button>
      </div>
    )
  }
}


function B () {

  const [idx, setIdx] = useState(0)

  const renderLine = () => {
    let result = null
    switch (idx) {
      case 0:
        result = <h1>年薪10W</h1>
        break
      case 1:
        result = <h1>年薪20W</h1>
        break
      case 2:
        result = <h1>年薪30W</h1>
        break
      default:
        result = <h1>待就业</h1>
    }
    return result
  }

  return (
    <div>
      <h1>函数式组件</h1>
      { renderLine() }
      <button onClick={()=>setIdx((idx+1)%4)}>跳槽</button>
      <button onClick={()=>setIdx(x=>((x+1)%4))}>跳槽</button>
    </div>
  )
}

export default B
