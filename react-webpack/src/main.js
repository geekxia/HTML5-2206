// 入口文件
import { createRoot } from 'react-dom/client'
import App from './App.jsx' // eslint-disable-line

const root = createRoot(document.getElementById('app'))
// root.render(<App />)  // @babel/preset-react，它要使用React.createElement()这个方法进行编译
root.render(React.createElement(App, {}, []))


// import './assets/app.scss'

/* eslint-disable */
/* eslint-enable */

// 动态导入技术（当webpack打包时，只要遇到()=>import()）会切割生成一个新的JS文件（chunk）
// 这个技术就是代码分离（分割技术）
// const dog = () => import('@/utils/dog')
// dog()

// import Dog from './utils/request'
//
// const d = new Dog()
// d.run()
//
// const user = {
//   name: '张三',
//   child: {
//     name: '李四',
//     age: 10
//   }
// }
//
// console.log('---', user?.child?.age)
//
// var a = 100
// console.log('a', a)
// console.log('a', a)
// console.log(100)
