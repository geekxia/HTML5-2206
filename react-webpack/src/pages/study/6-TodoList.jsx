// 学习表单绑定、列表渲染

// 1、表单绑定：在React中表单取值是需要手动取值的。具体做法是，给表单的value/checked属性添加一个声明式绑定，再添加onChange事件处理器，并在事件处理器中手动取值来改变这个声明式变量。这种玩法在React中称之为“受控表单”。

// 2、什么是受控表单？一个表单的value属性或者checked属性由state声明式变量所控制着，这种表单就是受控表单。
// 3、什么是受控组件？一个组件的自定义属性的值由state声明式变量所控制着，有且仅有当state变量发生变化时，这个组件才能更新。

// 4、列表渲染：在React中推荐使用map()来实现。为什么推荐使用map()呢？因为它接收一个数据源数据作为参数，返回一个新的数组。像这样 list.map((ele,idx)=>(<jsx/>))。

// 5、总结：表单绑定使用受控表单，列表渲染使用map()方法。

// [
//   { id: 1, task: '吃饭' },
//   { id: 2, task: '读书' }
// ]
//
// const newList = list.map(callback)
//
// [
//   <div><span>1</span>-<span>吃饭</span></div>,
//   <div><span>2</span>-<span>读书</span></div>,
// ]

import { Component, useState } from 'react'

class A extends Component {

  constructor (props) {
    super(props)
    this.state = {
      todo: '',
      list: []
    }
  }

  getTodo (ev) {
    // console.log('----change', ev.target.value)
    this.setState({ todo: ev.target.value })
  }

  confirm () {
    // 向列表中追加todo
    console.log('---todo', this.state.todo)
    if (!this.state.todo.trim()) return
    this.setState(state=>({
      // 在不改变源数据的前提下，向其中push一条数据
      list: [...state.list, {id: Date.now(), task: state.todo}],
      todo: ''
    }), ()=>{
      console.log('---new list', this.state.list)
    })
  }

  addByEnter (ev) {
    if (ev.keyCode === 13) {
      this.confirm()
    }
  }

  deleteRow (id) {
    this.setState(state=>({
      list: state.list.filter(ele=>ele.id!==id)
    }))
  }

  render () {

    const { todo, list } = this.state

    return (
      <div>
        <div>
          {/* <input type="text" :value='todo' @input="todo=$event.target.value" /> */}
          {/* <input type="text" value={todo} onInput={ (e)=>this.getTodo(e) } /> */}

          {/* 使用受控表单进行表单取值 */}
          <input type="text" value={todo} onChange={ (e)=>this.getTodo(e) } onKeyUp={(ev)=>this.addByEnter(ev)} />

          <button onClick={()=>this.confirm()}>添加</button>
        </div>
        <div>
          {
            list.map((ele,idx,arr)=>(
              <div key={ele.id}>
                <span>{ele.id}</span>
                -
                <span>{ele.task}</span>
                <button onClick={()=>this.deleteRow(ele.id)}>删除</button>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

function B () {

  const [todo, setTodo] = useState('')
  const [list, setList] = useState([])

  const confirm = () => {
    if (!todo.trim()) return
    setList([...list, {id:Date.now(),task:todo}])
    setTodo('')
  }

  const rowDel = id => {
    setList(list.filter(ele=>ele.id!==id))
  }

  const addByEnter = ev => {
    if (ev.keyCode === 13) {
      confirm()
    }
  }

  return (
    <div>
      <input type="text" value={todo} onChange={ev=>setTodo(ev.target.value)} onKeyUp={ev=>addByEnter(ev)} />
      <button onClick={confirm}>添加</button>
      <hr/>
      {
        list.map(ele=>(
          <div key={ele.id}>
            <span>{ele.id}</span>
            :
            <span>{ele.task}</span>
            <button onClick={()=>rowDel(ele.id)}>删除</button>
          </div>
        ))
      }
    </div>
  )
}

export default B
