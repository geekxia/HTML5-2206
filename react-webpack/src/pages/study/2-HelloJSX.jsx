// 理解JSX语法

// 1、JSX = JavaScript XML，是一种语法，由Facebook发布的。浏览器是不支持这种语法。
// 2、在编写React组件视图结构时，JSX是可选的（你可以使用React.createElement('tag',{},[])编写视图结构），但官方推荐使用JSX编写视图。
// 3、JSX语法最终会被 @babel/preset-react进行编译，编译的结果就是React.createElement()这种语法。
// 4、要求：随时有能力把JSX语法转换成React.createElement()语法，反之亦然。
// 5、JSX元素：本质上就是React.createElement()的返回值结果，是变量，也是对象，并且是不可变对象。
// 6、为什么JSX元素要设计成不可变对象？因为JSX元素最终会被渲染成真实DOM，所以不能直接操作“原材料”，只能使用声明式。
// 7、什么是元素？什么是组件？由class或function定义的东西叫组件，由JSX语法或React.createElement()返回的结果叫做元素。你可以把元素理解成是组件实例化的对象。

// JSX元素（Fiber树）
const ele = (
  <div className='qf' title='千锋'>
    <span>你好</span>
    <a href="http://qf.com">千锋教育</a>
  </div>
)

// 创建React元素
const view = React.createElement(
  'div',
  {className:'qf',title:'千锋'},
  [
    React.createElement('span', {key:1}, '你好'),
    React.createElement('a', {href:'http://qf.com', key:2}, '千锋教育')
  ]
)

let element1 = <div>你好</div>
const element2 = React.createElement('div', {}, '你好')

// 【错误】
// element1.name = 'qf'  // 添加属性
// delete element1.key   // 删除属性
// element1.key = 100    // 修改属性

console.log('---element1', element1)
console.log('---element2', element2)

function B (props) {
  return ele
}

export default B
