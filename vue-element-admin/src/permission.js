// 为了给router添加全局守卫，所以要导入router实例
import router from './router'
// 导入vuex实例
import store from './store'

// 从element-ui中导入弹框组件（JS组件）
import { Message } from 'element-ui'

// 进度条组件（显示页面的顶部）
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// 配置进度条组件
NProgress.configure({ showSpinner: false })

// 从utils目录中导入了两个工具方法
import { getToken } from '@/utils/auth' // 从cookie中取出Token
import getPageTitle from '@/utils/get-page-title'

// 白名单页面（无须登录，就可以访问的页面）
const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

// 全局守卫（登录拦截、权限设计）
// beforeEach(fn)  URL找“路由规则”时触发
// beforeResolve(fn)  path找component组件时触发
// afterEach(fn)  当<router-view>显示组件完成时触发

router.beforeEach(async(to, from, next) => {
  // 每次url发生变化时，开启进度条
  NProgress.start()

  // DOM操作，设置文档标题
  document.title = getPageTitle(to.meta.title)

  // 判断用户是否登录（Y / N）
  const hasToken = getToken()

  // 第一次条件判断：判断是否有Token
  if (hasToken) {
    // 第二次条件判断：判断你访问的是不是登录页
    if (to.path === '/login') {
      // 如果有Token，表示你已经登录过了。接着判断你是不是想访问登录页。
      // 如果你想访问登录页，直接重定向到系统首页。你没有必要再访问登录页了。
      next({ path: '/' })
      NProgress.done()
    } else {
      // 如果有Token，你将要访问的页面不是登录页。
      // 从Vuex中访问用户信息（用户roles），判断用户信息(roles)是否存在。
      // 注意：后端返回的用户信息的roles肯定是一个非空数组。
      const hasRoles = store.getters.roles && store.getters.roles.length > 0

      // 第三次条件判断：判断Vuex中有没有用户信息(roles)
      if (hasRoles) {
        // 如果Vuex中存在着后端返回的用户信息(roles)，直接通过，意思是你有权访问目标页面。
        next()
      } else {
        // 如果Vuex中不存在用户信息（roles)，说明那些有权限的路由动态菜单还没有生成。
        try {
          // 走Vuex流程，派发user中getInfo调接口，使用Token获取用户信息(roles)
          // 来自后端的roles应该是这样的：['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')

          // 走Vuex流程，派发permission中的generateRoutes，生成当前用户可以访问的路由规则。
          // 具体算法是这样：使用后端返回用户roles和路由元信息中的roles进行对比，得到当前用户可以访问的路由规则。
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 手动地向router.routes中添加路由规则。（那些有权限的路由规则，在这里完成了注入）
          router.addRoutes(accessRoutes)

          // 到此为上，那些有权限的路由规则已经完成注入。现你可以访问你能访问的页面了。
          next({ ...to, replace: true })
        } catch (error) {
          // 如果获取用户信息或者生成动态路由规则报错，就重置Token，然后跳转登录页。
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 第四次条件判断：判断你访问的是不是白名单页面。
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果没有Token，你想访问的目标页面在白名单中，直接通过。
      next()
    } else {
      // 如果没有Token，你想访问的页面不在白名单中，去登录吧。
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done() // 当页面加载完成时，关闭进度条
})
