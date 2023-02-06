
// 9、useId()
  // - 作用：返回一个唯一标识，在函数式组件的整个运行过程中保证唯一性。
  // - 注意：是React18后新增的。

// 10、useDeferredValue()
  // - 作用：和“防抖”的作用是一样的。它和防抖函数的区别在于，这个Hooks所延迟的时间是不确定的，得看浏览器“脸色”。
  // - 说明：当在表单搜索上执行这个Hooks功能时，表单输入不会被延迟，只有表单输入结果的“deferredValue”更新会被延迟。
  // - 注意：是React18后新增的。

// 11、useTransition()
  // - 作用：我们都知道React组件渲染被划分为两个阶段，分为render阶段、commit阶段。在React18中，使用这个Hooks可以人为地“标记”一个更新行为是可中断的。当浏览器比较忙时，commit阶段走到这个“标记”处，可以选择中断。
  // - 注意：React18后新增的。是一种性能优化方案。

// - 12、自定义Hooks玩法
  // - 什么情况下需要封装Hooks？当逻辑需要分离时，你就可以封装Hooks。
  // - 什么是自定义Hooks？用已有的Hooks来组合逻辑，得到新的可复用的可维护的Hooks，自定义Hooks本质上就是一个函数。
  // - 自定义Hooks原则：命名必须以use*开头，自定义Hooks只能用在函数式组件的内部（return之前），自定义Hooks可以被复用并且是完全独立的。

// - 13、还有很多优秀的Hooks库，到时再分享。
  // - react-use
  // - ahooks

import { useId, useState, useEffect, useDeferredValue, useTransition } from 'react'

function B (props) {

  const id1 = useId()
  const [num, setNum] = useState(1)
  const [list, setList] = useState([])

  const [text, setText] = useState('')
  const searchText = useDeferredValue(text)

  // isPending是一个布尔值，如果它为true，就表示commit阶段暂停了。
  // startTransion是一个函数，它要接收一个更新行为，并把这个更新行为标记成可中断的。
  const [isPending, startTransion] = useTransition()

  useEffect(()=>{
    if (text.trim()) {
      // 实时查询
      console.log('----正在调接口', searchText)
    }
  }, [searchText])

  const updateList = () => {
    // 把这个列表更新行为，标记成可中断的。当浏览器比较忙时，commit阶段可以在这里选择中断。
    startTransion(()=>{
      setList(Array(5000).fill(1))
    })
  }

  return (
    <div>
      <h1>学习Hooks编程</h1>
      <h1>{ id1 }</h1>
      <h1>{ num }</h1>
      <button onClick={()=>setNum(num+1)}>自增</button>
      <hr/>

      搜索：<input type="text" value={text} onChange={ev=>setText(ev.target.value)}/>
      <hr/>

      <h1>{ isPending ? '中断了' : '正常' }</h1>
      <button onClick={updateList}>更新列表</button>
      <div>
      {
        list.map((ele,idx)=>(<div key={idx}>{idx} - {ele}</div>))
      }
      </div>
    </div>
  )
}

export default B
