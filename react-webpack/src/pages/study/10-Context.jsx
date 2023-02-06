// 学习上下文

// 1、在React中，上下文是一种通信方案。

// 2、上下文的特点
  // 在组件树中，是一种自上而下的单向数据流通信方案，数据只能从父级组件注入，在后代组件中访问。
  // 组件关系只要满足“父级组件-后代组件”这种关系时，都可以使用上下文进行通信。
  // 在父级组件中provide提供数据，在后代组件中注入并使用，这种通信不具有响应式，有点像Vue中的provide/inject通信。

// 3、如何使用React上下文？
  // 使用 const { Provider, Consumer } = React.createContext() 创建上下文
  // 使用 <Provider value={} /> 向组件树中提供任何数据
  // 在后代组件中使用 <Consumer>{(ctx)=>(<jsx/>)}<Consumer>来访问上下文数据
  // 如果后代组件是类组件，还可以使用 Page.contextType 来访问上下文数据

// 4、使用props穿透和使用上下文通信，有什么区别？
  // - props穿透必须理清楚组件之间的关系（每一层父子关系都要理清楚），上下文只有关心是不是满足“父级-后代”关系。
  // - props穿透适合那种很明显就能看清父子关系的组件间通信，上下文通信适合那种父子关系不明确的组件间通信。
  // - props穿透会导致后代组件的props变得臃肿，上下文通信更加直接方便。

// 5、上下文通信，在哪些场景下会用到呢？
  // - 路由中会用到上下文
  // - 状态管理中会用到上下文
  // - 组件库中，切换主题色、切换组件大小Size等，会用到上下文
  // - 国际化中，会用到上下文

import React, { PureComponent, useState } from 'react'

// 创建一个React上下文对象
const ThemeContext = React.createContext()
const { Provider, Consumer } = ThemeContext

class Child extends PureComponent {
  render () {
    // console.log('child----this', this)
    return (
      <Consumer>
        {
          (context) => {
            console.log('---ctx', context)
            return (
              <div style={ context }>
                <h1>我是孩子</h1>
              </div>
            )
          }
        }
      </Consumer>
    )
  }
}
// 如果是类组件还可以像这样访问上下文数据（一般很少用）
// Child.contextType = ThemeContext

function Parent (props) {
  return (
    <div>
      <h1>我是父亲</h1>
      <Child />
    </div>
  )
}

// 封装换肤组件
function ThemeToggle ({ value, onChange }) {

  const change = (ev) => {
    const key = ev.target.name
    const val = ev.target.value
    // 把变化后最新的主题色，回传给父级组件
    onChange({ ...value, [key]: val })
  }
  // <></> 是 <React.Fragment></React.Fragment> 的语法糖，用于处理视图结构的多节点问题。
  // <></> 可以理解成是空节点，不会被渲染成DOM结构，不占文档流。
  return (
    <>
      {/* 复用表单的 onChange处理器的第一种玩法 */}
      {/*
        <div>
          前景色：<input type="color" value={value.color} onChange={(ev)=>change('color', ev)} />
          背景色：<input type="color" value={value.background} onChange={(ev)=>change('background', ev)} />
        </div>
      */}

      {/* 复用表单的 onChange处理器的第二种玩法 */}
      <div>
        前景色：<input type="color" value={value.color} name='color' onChange={change} />
        背景色：<input type="color" value={value.background} name='background' onChange={change} />
      </div>
    </>
  )
}

// 页面组件
function B () {
  const [theme, setTheme] = useState({color: '#000000', background:'#ffffff' })
  return (
    <Provider value={theme}>
      <div>
        <h1>页面</h1>
        <Parent />
      </div>
      <ThemeToggle value={theme} onChange={ev=>setTheme(ev)} />
    </Provider>
  )
}

export default B
