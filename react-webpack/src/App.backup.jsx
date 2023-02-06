import { HashRouter, BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from '@/store'

import Layout from '@/layout'
import Login from '@/pages/login'

import '@/styles/app.scss'

import { asyncRoutes } from '@/pages'

// 为了实现动态主题
import 'antd/dist/antd.variable.min.css'

// 这里不考虑三级路由
function createRoutes (accessRoutes) {
  let result = []  // 存储那些路由规则们
  accessRoutes.forEach(route=>{
    if (route.path && route.element) {
      result.push(
        <Route key={route.key} path={route.path} element={route.element}></Route>
      )
    }
    if (route.children) {
      route.children.forEach(route=>{
        result.push(
          <Route key={route.key} path={route.path} element={route.element}></Route>
        )
      })
    }
  })
  return result
}

// 根组件
function App() {

  return (
    <HashRouter>
      <Provider store={store}>
        <Routes>
          {/*
            在路由V6版本，一级路由无须指定渲染位置，一级路由在哪里，对应element就显示在哪里。
            次级路由，必须使用 <Outlet>组件来指定二级element的渲染位置。
          */}
          <Route path='/' element={<Layout />}>
            { createRoutes(asyncRoutes) }
          </Route>

          <Route path='/login' element={<Login />} />
        </Routes>
      </Provider>

    </HashRouter>
  )
}

export default App
