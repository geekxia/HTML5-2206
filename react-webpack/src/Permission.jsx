import { useRoutes, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useMemo } from 'react'

import { constantRoutes, asyncRoutes } from '@/pages'
import { getInfo } from '@/store/actions'
import { generateRoutes } from '@/store/actions/permission'
import useTitle from '@/hooks/useTitle'

// 添加加载进度条
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false })

const whiteList = ['/login']  // 白名单

// 你可以把这个组件想象成vue-router的路由守卫
export default () => {
  console.log('------------------------start')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // 从状态管理中访问Token
  const { token, roles, accessRoutes } = useSelector(state=>state.user)
  const { pathname } = useLocation()

  NProgress.start()  // 打开进度条
  useTitle()  // 根据页面信息显示动态的Title

  useEffect(()=>{
    console.log('-----token')
    // 当token从无到有，有Token了就可以调接口获取用户信息了
    if (token) {
      dispatch(getInfo())
    } else {
      navigate('/login', {replace: true})
    }
  }, [token])

  useEffect(()=>{
    console.log('-----roles')
    if (roles.length > 0 && accessRoutes.length === 0) {
      // 使用后端返回的roles数组，和路由表，执行算法，生成当前用户可访问的路由规则们
      dispatch(generateRoutes(asyncRoutes, roles))
    }
  }, [roles])

  useEffect(()=>{
    console.log('-----accessRoutes')
    // 说明在登录流程中，动态路由们已经生成完成，跳转到系统首页
    if (accessRoutes && accessRoutes.length > 0 && pathname==='/login') {
      navigate('/dashboard', { replace: true })
    }
  }, [accessRoutes])

  useEffect(()=>{
    console.log('-----pathname')
    // 当Token不存在，并且你访问的是“非白名单页面”，应该立即跳转/login
    if (!token && !whiteList.includes(pathname)) {
      navigate('/login', {replace:true})
    }
    // 有Token，并且你访问的是/login，应该立即跳转到 /
    if (token && pathname === '/login') {
      navigate('/dashboard', {replace: true})
    }
    // 有Token，并且你访问的是 / ，应该立即跳转 /dashboard
    if (token && pathname === '/') {
      navigate('/dashboard', {replace: true})
    }
  }, [pathname])

  useEffect(()=>{
    NProgress.done() // 当页面加载完成时，关闭进度条
  })

  // 使用计算属性生成二级嵌套的路由
  const routes = useMemo(()=>{
    console.log('-----routes')
    // 数组复杂
    let result = [...constantRoutes]
    result[0].children = accessRoutes  // 给Layout添加孩子们
    return result
  }, [accessRoutes])

  const element = useRoutes(routes)

  console.log('------------------------end')
  return element
}
