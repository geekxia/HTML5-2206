

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */

// roles 是后端返回的用户roles   ['editor','baoan']
// route 是一条具体的路由规则  { path, component, children, meta: {roles:['editor']} }

// hasPermission(['editor','baoan'], { path, component, children, meta: {roles:['editor']} })

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    // 如果路由规则中没有mata元信息，或者meta元信息中没有roles字段，说明这是一条可被访问的路由规则。
    return true
  }
}

// 举例：api.roles=['editor','shop']   route.mata.roles=['editor']   有权访问
// 举例：api.roles=['editor','shop']   route.mata.roles=['admin']    无权访问

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */

// routes 是那些有权限的路由规则们（动态路由）
// roles 是后端返回的用户roles
export function filterAsyncRoutes(routes, roles) {
  const res = [] // 最终返回符合条件的权限路由

  routes.forEach(route => {
    const tmp = { ...route }

    if (hasPermission(roles, tmp)) {
      // 如果当前被遍历这条路由规则可访问，进一步判断它的childen二级路由是否有权
      if (tmp.children) {
        // console.log('----children', tmp.children)
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      // 如果你有权访问，就把这条路由规则添加res中
      res.push(tmp)
    }
  })

  return res
}

// 用于执行权限算法的action生成器
export function generateRoutes(asyncRoutes, roles) {

  return dispatch => {
    // 用于保存当前用户可以访问的权限路由
    let accessRoutes = []
    // 所有用户包括admin用户都参与权限设计。
    accessRoutes = filterAsyncRoutes(asyncRoutes, roles)

    // console.log('----权限算法执行完成', accessRoutes)
    // 把权限算法执行的结果，保存在状态管理中
    dispatch({ type: 'USER_PERMISSION', payload: accessRoutes })
  }
}
