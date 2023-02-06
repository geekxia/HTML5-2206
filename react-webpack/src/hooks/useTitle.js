import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import { asyncRoutes } from '@/pages'

function useTitle () {
  const { pathname } = useLocation()
  useEffect(()=>{
    asyncRoutes.forEach(ele1=>{
      if (ele1.path === pathname) {
        document.title = ele1?.meta?.title || '千锋'
      } else {
        if (ele1.children) {
          ele1.children.forEach(ele2=>{
            if (ele2.path === pathname) {
              document.title = ele2?.meta?.title || '千锋'
            }
          })
        }
      }
    })
  }, [pathname])
}

export default useTitle
