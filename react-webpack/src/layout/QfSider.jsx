import { Menu, Image } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import logo from '@/assets/logo.png'
import useMenu from './useMenu'

// import { asyncRoutes } from '@/pages'

// Logo组件
const Logo = ({ value }) => {
  return (
    <div className={`logo ${value ? 'small' : ''}`}>
      <img src={ logo } />
    </div>
  )
}


// 适配器方法
function getItem(route, children) {
  if (!route.hidden) {
    return {
      key: route.key,
      icon: route.icon || null,
      // Menu组件的二级菜单，取决这个children字段
      children: children || null,
      // 有path时，把菜单项渲染成可跳转的菜单路由
      label: route.path ? <Link to={route.path}>{ route.label }</Link> : route.label
    }
  }
}

// 用于生成Menu菜单所需要的那个items
// accessRoutes 当前登录用户有权访问路由们（静态路由、筛选过的动态路由们）
function createItems (accessRoutes) {
  let result = [] // 目标items
  accessRoutes.forEach(route=>{
    if (!route.children) {
      result.push(getItem(route))
    } else {
      result.push( getItem(route, route.children.map(ele=>getItem(ele)) ))
    }
  })
  return result
}


export default (props) => {

  // 使用自定义Hooks。Hooks只能在这里使用，不能在函数外使用，不能在JS语句中使用，不能是JSX中使用。
  const [openKeys, selectedKeys] = useMenu()
  const { accessRoutes } = useSelector(state=>state.user)

  return (
    <>
      <Logo {...props} />
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={openKeys}
        defaultSelectedKeys={selectedKeys}
        items={createItems(accessRoutes)}
      />
    </>
  )
}
