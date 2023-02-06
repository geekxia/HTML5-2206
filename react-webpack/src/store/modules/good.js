import produce from 'immer'

const initState = {
  cates: []
}

export default (state=initState, {type, payload}) => {
  return produce(state, state=>{
    switch (type) {
      case 'GOOD_CATES':
        state.cates = payload
        break
      default:
    }
  })
}
