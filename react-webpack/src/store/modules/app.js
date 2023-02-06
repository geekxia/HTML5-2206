import produce from 'immer'
// 语法： const newNewState = produce(oldState, (newState)=>{随意地增删改查})
console.log('---lang', navigator.language)

const initState = {
  size: localStorage.getItem('size') || 'middle',
  lang: localStorage.getItem('lang') || navigator.language.split('-')[0],  // zh-CN
  color: localStorage.getItem('color') || '#1890f1'
}

// 理解：这是一个子reducer（相当于我们说的子store）
// 纯函数：不能直接修改入参，相同的入参永远返回相同的
function reducer (state=initState, {type, payload}) {
  // console.log('---收到了信号', {type, payload})
  // 1、当有信号到达时，先对state进行深拷贝
  // 2、根据action的type、payload修改深拷贝后state
  // 3、返回修改后的那个最新的state
  return produce(state, state=>{
    // 根据action 进行 do something
    switch (type) {
      case 'APP_SIZE':
        state.size = payload
        localStorage.setItem('size', payload)
        break
      case 'APP_LANG':
        state.lang = payload
        localStorage.setItem('lang', payload)
        break
      case 'APP_COLOR':
        state.color = payload
        localStorage.setItem('color', payload)
        break
      default:

    }
  })
}

export default reducer
