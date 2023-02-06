import { useLocation } from 'react-router-dom'
import { asyncRoutes } from '@/pages'

function useBreadcrumb () {
  const routes = [...asyncRoutes]
  const { pathname } = useLocation()

  // 生成面包屑的“项”
  let result = [routes[0]]
  // 建议使用forEach方法
  for (let i=1; i<routes.length; i++) {
    if (routes[i].children) {
      for (let j=0; j<routes[i].children.length; j++) {
        // console.log('---item ', routes[i].children[j])
        if (routes[i].children[j].path === pathname) {
          result.push(routes[i])
          result.push(routes[i].children[j])
        }
      }
    } else {
      if (pathname === routes[i].path) {
        result.push(routes[i])
      }
    }
  }

  return result
}


export default useBreadcrumb
