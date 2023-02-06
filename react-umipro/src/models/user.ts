
import { fetchCnodeList } from '@/services/ant-design-pro/api'

// console.log('---fetchList', fetchList)

export default {
  namespace: 'user',   // 命名空间
  // 定义可共享的状态数据
  state: {
    msg: 'Hello Saga',
    list: [],
  },
  // 相当于Vuex中的mutations
  reducers: {
    changeMsg (state, action) {
      state.msg = action.payload  // immer开启过了
    },
    updateList (state, { payload}) {
      state.list = payload
    }
  },
  // 相当于Vuex中的actions
  effects: {
    // call(api接口方法, {入参})  触发调接口
    // put({type,payload})  相当于dispatch()
    *getList ({payload}, { call, put }) {
      // console.log('---payload', payload)
      const res = yield call(fetchCnodeList, { params: payload})
      // console.log('---文章列表', res)
      yield put({ type: 'updateList', payload: res.data})
    }
  }
}


// redux-thunk
//
// function getList (payload) {
//   return function (dispatch) {
//     fetchList(payload).then(res=>{
//       dispatch({type: 'GETL_lset', payload: res.data})
//     })
//   }
// }
//
// dispatch(getList({limit:5,page:1}))
