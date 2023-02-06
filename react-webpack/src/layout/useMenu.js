import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { asyncRoutes } from '@/pages'

// 自定义封装Hooks（必须要以use*开头）
function useMenu () {
  // 访问浏览器的URL信息
  const { pathname } = useLocation()
  // console.log('---pathname', pathname)
  // 用URL信息和我们路由表进行计算，找到高亮的菜单项以及它要展开的父节点
  return useMemo(()=>{
    let selectedKey = ''
    let openKey = ''
    console.log('---重新计算了')

    asyncRoutes.forEach(ele=>{
      if (!ele.children) {
        if (ele.path === pathname) {
          selectedKey = ele.key
        }
      } else {
        ele.children.forEach(ele2=>{
          if (ele2.path === pathname) {
            selectedKey = ele2.key
            openKey = ele.key
          }
        })
      }
    })

    return [[openKey+''], [selectedKey+'']]
  }, [])
}

export default useMenu
