// 怎么学习Redux传统架构？【三个三】

// 1、三个API：createStore() / combineReducers() / applyMiddleware()。
// 2、三个特点：store必须是单一数据源、store数据是只读的、store数据只能通过纯函数reducer来修改。
// 3、三个概念：store(数据容器)、action(信号{type,payload})、reducer(专门用于修改store的纯函数)。

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'  // 用于调试Redux数据流
import thunk from 'redux-thunk'    // 用于支持Redux异步数据流
// 默认情况下，Redux只接收plain object。使用redux-thunk，也可以接收function了。
// 也就是说，有了redux-thunk的支持，在页面中可以 dispatch({type,payload} / function)
// redux-thunk是怎么工作呢？在redux的入口处拦截页面dispatch过来的数据。如果有人派发function过来，就调用这个function并给它一个实参dispatch。如果派发过来的不是function，就不管。

import app from './modules/app'
import user from './modules/user'
import good from './modules/good'
// 用于合并多个reducer（因为reducer是用来修改store，所以合并reducer就是在合并store）
const reducer = combineReducers({
  app, user, good
})
const store = createStore(
  reducer,
  // 使用compose对多个中间件进行合并
  // 注意，中间件执行是有先后顺序的
  compose(
    applyMiddleware(thunk),
    applyMiddleware(logger)
  )
)

console.log('----store', store.getState())

export default store
