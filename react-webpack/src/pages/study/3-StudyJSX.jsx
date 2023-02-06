// 盘点JSX语法细节

// 1、在JSX中可以嵌套表达式，使用 {} 来嵌套。在JSX视图，凡是动态的变量（表达式）都使用 {}包起来。
// 2、当JSX定义视图比较复杂时，建议换行，像HTML那样对齐，换行后建议用 () 把JSX元素整体包裹起来。
// 3、JSX是变量，也是表达式，所以JSX元素可以作为函数的入参，也可以作为函数的返回值，还可以用在if/for循环中。
// 4、JSX语法有三个变化的属性：className(class)、tabIndex(tabindex)、htmlFor(for)
// 5、JSX语法有三个新增的属性：key(用于列表渲染)、ref(快捷的DOM方式)、dangerouslySetInnerHTML(用于渲染HTML片段)
// 6、JSX中，不仅自定义组件可以使用单闭合，任何html标签都可以单闭合，比如 <div />。
// 7、内联style语法：<div style={{ cssKey1: 'cssValue1', cssKey2: 'cssValue2' }} />
// 8、className语法：<div className='box' className={`${cc} ff`} />
// 9、在JSX中，使用 {} 渲染后端接口数据，默认支持防注入攻击(XSS)。
// 10、JSX是对象，因为JSX变量是React.createElement()的返回值，这个返回值是对象结构，所以JSX是对象。这种JSX对象就是“Fiber单元”。很多很多嵌套的“Fiber单元”就构成了“Fiber树”（双向链表）。
// 11、JSX语法中，所有的React组件（由class或function定义）的名称都必须以大写字母开头，比如 <A />， <MyButton />。
// 12、JSX支持“点语法”，比如 React.Componenet、<React.Fragment />、<Qf.Button />
// 13、对自定义组件来霁，props是自定义属性；在HTML元素来讲，props就是你们学过的那些HTML标签属性。在使用props时，不能把JS语句赋值给props，props只能接收表达式。
// 14、在JSX中，向子组件传递props时，支持属性展开语法，像这样 <Child {...cPorps} />
// 15、当我们在使用自定义组件时，那些被自定义组件所嵌套的内容，在子组件中使用props.children来接收它们。详解一下props.children，可以是任何类型的数据，比如基本数据类型、引用数据类型、也可函数。
// 16、在JSX语法中，默认就是支持对数组的直接渲染，像这样 <div>{ [<div />, true, null, 100, {a:1,b:2}, [1,2,3]] }</div>
// 17、在JSX中，使用 {} 渲染 Boolean、null、undefined，都会被忽略，也就是说不生成文本节点。
// 18、在React中，封装组件时，无论是类组件render的返回值，还是函数式组件的返回值，还可以是组件，像这样 const Foo = (props) => ([])

const hello = '你好'
const title = '千锋'

function fullname (user) {
  return `${user.firstname} ${user.lastname}`
}

const ele = (
  <div>
    <h1>你好</h1>
  </div>
)

function handle (arg) {
  if (arg) {
    return <div>{ arg }</div>
  } else {
    return <div>你好</div>
  }
}

const content = '<div class="box"><a style="color:red;" href="http://baidu.com">百度</a></div>'

const cc = 'qf'
const dd = 'sz'

// 这是普通的函数声明，不是JSX语法支持的组件，只能这样用 b()
function b () {
  return (
    <div>你好</div>
  )
}

const Qf = {
  Button () {
    return (<button>点击</button>)
  },
  Modal: function () {
    return (<div>弹框</div>)
  }
}

function PhotoList (props) {
  return <h1>照片列表 { props.num } 条</h1>
}

function VideoList (props) {
  return <h1>视频列表 {props.num } 条</h1>
}

const pv = {
  photo: PhotoList,
  video: VideoList
}

function Child (props) {
  const { name, age, addr, children, ...otherProps } = props
  console.log('---child other props', otherProps)
  // 处理children渲染问题
  let result = null
  if (typeof children === 'function') {
    result = children(1,2)
  } else {
    result = children
  }
  return (
    <>
      <h1>{ name } : { age } : { addr }</h1>
      <div>{ result }</div>
    </>
  )
}

function MyList (props) {
  return [
    <div key='1'>一</div>,
    <div key='2'>二</div>,
    <div key='3'>三</div>
  ]
}

// 这才是真正的React组件，支持JSX语法，<B />
function B (props) {

  const { Button } = Qf
  const MediaList = pv[props.type||'photo']
  const chProps = {
    name: '张三',
    age: 20,
    addr: '广东深圳',
    // 约定，向子组件传递一个事件处理器时，建议以on*开头
    onHandle: () => { console.log('handle') },
    list: [1,2,3,4],
    info: { a: 1, b: 2, c: 3 },
    footer: (<div>我的双脚</div>),
    id: Symbol(1),
    alive: true
  }

  return (
    <div title={ title }>
      <h1>{ hello + '吗' } ？</h1>
      <h1>{ `${hello}吗 ？` }</h1>
      <h1>{ fullname({firstname:'张', lastname:'三'}) }</h1>
      <hr/>
      <h1 className='a'>{ handle( <span>大家好</span> ) }</h1>
      <div dangerouslySetInnerHTML={  {__html: content } }></div>
      <div style={ {border:'1px solid red',fontSize:'20px',height:'20px'} } />
      <h1 className={`${cc} ff gg ${dd+1}`}>测试</h1>
      <div>{ b() }</div>
      <hr/>
      <Qf.Button />
      <Qf.Modal />
      <Button />

      <div title={ 1+2+3 }></div>
      <MediaList num={ Math.random() } />

      <input type="radio" /><br/>
      <input type={"radio"} />
      <hr/>

      <Child name={chProps.name} age={chProps.age} addr={chProps.addr} />
      <Child {...chProps}>
        {/* (a,b)=>(<div>{ a*b }</div>) */}
        { undefined }
      </Child>
      <hr/>

      <div style={{border:'1px solid blue'}}>
        {
          [
            <div key='1' style={{border:'1px solid red'}} />,
            true,
            null,
            100,
            [1,2,<span key='2'>3</span>]
          ]
        }
      </div>
      <hr/>

      <MyList />




      <br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
  )

}

export default B
