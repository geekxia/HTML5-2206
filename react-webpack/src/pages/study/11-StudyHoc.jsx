// 学习高阶组件

// 1、高阶组件 HOC = Higher Order Component，所以高阶组件，也被称之高阶函数、容器组件。高阶组件是类组件编程中的一种重要代码逻辑复用技巧。随着Hooks的流行，高阶组件用得越来越少了。

// 2、高阶组件（高阶函数）语法：接收一个React组件作为入参，经过一翻修饰（而非修改），最后返回一个全新的React组件。所以这个入参的React组件，被称之为“UI组件”；这个高阶组件被称之为“容器组件”。需要注意的是，在高阶组件中，无论你怎么对UI进行修改，但不能对它进行修改，所以高阶组件是一种纯函数（什么是纯函数？入参不能被修改，并且相同入参永远返回相同结果的函数，都叫纯函数。）

// 3、高阶组件的第一种定义方式：const hoc = (WC) => (props) => (<jsx/>)，入参就是UI组件，返回新组件。
// 4、高阶组件的第二种定义方式：const higherHoc = (...arg) => WC => props => (<jsx/ >)，比正确高阶组件更高阶，调用之后返回正常的高阶组件。

// const hoc = (a) => (b) => c => WC => props => (<jsx/>)
// function hoc (a) {
//   return function (b) {
//     return function (c) {
//       return function (WC) {
//         return function (props) {
//           return (
//             <div>
//               <WC />
//             </div>
//           )
//         }
//       }
//     }
//   }
// }

// 5、封装定义高阶组件时，要小心“props属性丢失”问题。怎么解决高阶组件导致的“属性丢失”问题？使用属性穿透（属性继承）来解决。

// 6、如何使用高阶组件呢？如果在类组件上，可以这样hoc(Page)，还可以使用装饰器语法。如果在函数式组件上，只能这样hoc(Page)。

// 7、高阶组件的使用场景
  // 在路由中withRouter()、在Redux状态管理中connent()、在Mobx中有inject()/observer()
  // 使用高阶组件给页面添加公共的视图结构，比如footer、水印等。
  // 使用高阶组件可以注入全局的公共的方法，比如弹框、吐司、校验方法。
  // 使用高阶组件可以添加相同的业务功能，比如埋点功能、DOM功能、BOM功能、订阅功能等。
  // 使用高阶组件可以实现权限设计，这个我们演示一下。
  // 关于更多与高阶组件有关的扩展，大家知乎一下。

import { PureComponent } from 'react'

function study (WrappedComponent) {
  // return class extends PureComponent {
  //   render () {
  //     return (
  //       <div>
  //         <nav>导航</nav>
  //         <WrappedComponent {...this.props} />
  //         <footer>底部</footer>
  //       </div>
  //     )
  //   }
  // }

  return props => (
    <div>
      <nav>导航2</nav>
      <WrappedComponent {...props} name='study' />
      <footer>底部2</footer>
    </div>
  )
}

// const hoc =  page(['admin', 'editor'])
// const NewHome = hoc(Home)
const page = (arr) => {
  console.log('---页面权限', arr)
  const roles = ['shop']  // 来自状态管理中的角色信息（也就是登录后后端返回的）
  const flag = roles.some(ele=>arr.includes(ele))
  return WrappedComponent => {
    return props => (
      <div>
        {
          flag
            ? <WrappedComponent {...props} age='20' />
            : <h1>你暂无权限访问，请联系管理员</h1>
        }
      </div>
    )
  }
}

const title = title => {
  return WC => class extends PureComponent {
    componentDidMount () {
      document.title = title || '千锋'
    }
    render () {
      return (
        <WC {...this.props} />
      )
    }
  }
}

// 只有在class上才能使用装饰器
@page(['admin', 'eidtor', 'shop'])
@study
@title('学习')
class A extends PureComponent {
  render () {
    console.log('---A props', this.props)
    return (
      <div>
        <h1>类页面</h1>
      </div>
    )
  }
}

const B = study(page([])(
  props => {
    console.log('---B props', props)
    return (
      <div>
        <h1>函数式组件页面</h1>
      </div>
    )
  }
))

export default A
