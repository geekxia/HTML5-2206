// 学习目标：使用组合思想来实现组件化。

// 1、React组件化属性校验，推荐使用prop-types第三包：https://www.npmjs.com/package/prop-types
  // - 像这样做属性类型校验和必填校验：Modal.propTypes = { title: PropTypes.string.isRequired }
  // - 像这样给属性添加默认值：Modal.defaultProps = { type: 'primary' }

// 2、什么是 “render props” ？
// 在封装React组件时，如果一个props属性其值是函数类型并返回JSX视图，那么这个props属性就是 “render props”，即可以参与自定义组件的视图渲染。像这样 <Modal footer={()=>(<jsx/>)} />，这个footer属性就被称为 “render props”。
  // “render props”在组件化中，用得非常多。

// 3、什么是 Portals ？
  // 在React中，使用Portals可以把一段JSX结构，“穿梭”插入到父级节点中的一种能力。
  // 语法：ReactDOM.createPortal(<jsx/>, dom节点)
  // 扩展：封装一个类似Vue3中的 <teleport>组件。

// 4、到底是什么组合？怎么理解组合？
  // - 组合是一种设计模式，它是React组件化的基础。
  // - 如何封装组件？第一步，根据UI视图拆解结构，得到一个一个可独立封装的小组件。第二步，把这些独立的小组件分别封装。第三步，再使用props把这些小组件串联起来。

// 5、如何封装我的Modal弹框？
  // （1）定义一个Modal组件，设计视图结构，由header、main、footer三个部分组件，背景还有一个<div>遮罩层。
  // （2）编写modal.scss样式，简单布局。
  // （3）设计header部分，由左侧标题、右侧关闭按钮组成，但左侧标题是动态的（string/jsx），右侧按钮可有可无，这些特别都是由用户决定的，这就想到了props（自定义props，使用prop-types做校验、添加props默认值）。
  // （4）设计main主体区域，非常重要，由用户决定，我就想到了props.children能搞定这个事儿。
  // （5）设计footer部分。根据我公司弹框的界面分析，发现只有三种弹框，分别是 confirm弹框、info提示框、danger删除框。为了设计按钮组的显示，所以又封装 <Button type>组件。再通过组合，得到三种不同的footer按钮组。
  // （6）设计弹框交互：使用visible属性控制显示与隐藏，使用onCancel实现点击“取消”“关闭按钮”“遮罩层”隐藏弹框，使用onOk表示确定事件。这里会涉及到父子组件通信。
  // （7）模仿antd的Modal的footer属性，我们使用“render props”自定义Modal弹框的底部按钮组。
  // （8）一般情况下，弹框不能直接渲染在当前页面中，应该渲染到docuemen.body中，怎么实现？使用ReactDOM.createPortal(<jsx>, dom)把弹框组件渲染到document.body中。
  // （9）扩展：封装一个类似Vue3中的<Teleport to>组件，默认把<Teleport>的children渲染到document.body中；如果用户指定了to属性，就渲染到父级节点的DOM中。

import { useState, PureComponent } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types' // 这React官方推荐的专门用于属性校验的一个包
import '@/assets/modal.scss'

// 自定义封装Button组件
function Button (props) {
  const { type, children, onClick } = props
  return (
    <div className='qf-button'>
      <span className={type} onClick={onClick}>{ children }</span>
    </div>
  )
}
Button.propTypes = {
  type: PropTypes.oneOf(['default', 'primary', 'danger', 'info']),
  children: PropTypes.string,
  onClick: PropTypes.func,
}
Button.defaultProps = {
  type: 'default',
  children: '按钮',
  onClick: () => {}
}

function ModalHeader (props) {
  const { title, onCancel, closable } = props
  return (
    <div>
      <div>{ title }</div>
      <div onClick={onCancel}>{ closable && 'X' }</div>
    </div>
  )
}

function ModalFooter (props) {
  const { type, onCancel, onOk, footer } = props
  const renderFooter = () => {
    let btns = []
    switch (type) {
      case 'confirm':
        btns = [
          <Button type='primary' key='1' onClick={onOk}>确定</Button>,
          <Button key='2' onClick={onCancel}>取消</Button>
        ]
        break
      case 'danger':
        btns = [
          <Button type='danger' key='1' onClick={onOk}>删除</Button>,
          <Button key='2' onClick={onCancel}>取消</Button>
        ]
        break
      default:
        btns = [
          <Button type='info' onClick={onCancel}>我知道了</Button>
        ]
    }
    return btns
  }
  return (
    footer ? footer() : renderFooter()
  )
}

class Teleport extends PureComponent {
  constructor (props) {
    super(props)
    const { to } = props
    console.log('---Teleport props', props)
    if (to === 'body') {
      this.container = document.createElement('div')
    } else {
      this.container = document.getElementById(to.slice(1))
    }
  }

  componentDidMount () {
    document.body.appendChild(this.container)
  }

  componentWillUnmount () {
    // 当路由切换时，移除弹框的挂载节点
    document.body.removeChild(this.container)
  }

  render () {
    return ReactDOM.createPortal(this.props.children, this.container)
  }
}

// 自定义封装弹框组件
function Modal (props) {
  const {  children, visible, onCancel, width, container } = props
  const handlerLayer = (ev) => {
    const { onCancel } = props
    if (ev.target.dataset.self) {
      onCancel()
    }
  }
  return (
    <Teleport to={container}>
       <div
         className='qf-layer'
         style={{display:visible?'block':'none'}}
         data-self='layer'
         onClick={(ev)=>handlerLayer(ev)}
       >
         <div
           className='qf-modal'
           style={{
             width: `${width}px`,
             marginLeft: `-${width/2}px`
           }}
         >
           <header>
              {/* 属性穿透 */}
             <ModalHeader {...props} />
           </header>
           <main>{ children }</main>
           <footer>
             <ModalFooter {...props} />
           </footer>
         </div>
       </div>
    </Teleport>
  )
}

// 所有属性都要给类型约束，node > elementType > element
// 必填属性使用.isRequired来约束
Modal.propTypes = {
  title: PropTypes.elementType,  // React元素类型 = func、jsx、string、null、undefined
  closable: PropTypes.bool,      // 布尔类型
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  type: PropTypes.oneOf(['confirm', 'danger', 'info']),
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  footer: PropTypes.func,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  container: PropTypes.string
}

// 非必填属性都要给默认值
Modal.defaultProps = {
  title: '标题',
  children: <div>主体内容</div>,
  type: 'info',
  visible: false,
  onCancel: () => {},
  onOk: () => {},
  width: 520,
  container: 'body'
}

// 页面测试组件
function B () {
  const [show, setShow] = useState(false)
  const submitDel = () => {
    setTimeout(()=>{
      console.log('--删除成功')
      setShow(false)
    }, 150)
  }
  return (
    <div>
      <button onClick={()=>setShow(true)}>测试弹框</button>
      <Modal
        visible={show}
        container='#box'
        title='危险'
        closable
        type='danger'
        onCancel={()=>setShow(false)}
        width='480'
        onOk={submitDel}
        footer={()=>{
          return [
            <Button type='danger' key='1' onClick={()=>setShow(false)}>忍心放弃</Button>
          ]
        }}
      >
        <div>
          你确定删除张三吗？
        </div>
      </ Modal>
    </div>
  )
}

export default B
