// 从路由中导入“静态路由”和“动态路由”
import { asyncRoutes, constantRoutes } from '@/router'

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
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      // 如果你有权访问，就把这条路由规则添加res中
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [], // 当前用户可访问的静态路由们+有权访问的动态路由们
  addRoutes: [] // 当前用户可访问的有权访问的动态路由们
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  // 使用用户roles和路由元信息中的roles，对比生成当前用户有权访问的路由规则（权限页面）
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // 用于保存当前用户可以访问的权限路由
      let accessedRoutes = []

      // if (roles.includes('admin')) {
      //   // 如果后端返回的用户roles中包含admin，那么就可以访问所有的“动态路由”。
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   // 如果后端返回的用户roles中不包含admin，就必须进行权限设计。
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }

      // 所有用户包括admin用户都参与权限设计。
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)

      // 把当前用户可访问的那些权限路由放在store中。
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes) // 给到await
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
