// 导入路由并注册
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* 布局组件 */
import Layout from '@/layout'

/* 路由模块 */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

// import backupRoutes from './backup'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   它默认值是false，当它为true时，在siderbar上不显示这个菜单。
 * alwaysShow: true               它默认值是false，当它为true时，显示根菜单上。
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * 静态路由：是所有人（角色）都能访问的路由规则.
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout, // 一级路由，显示App.vue中的<router-view>
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页大屏', icon: 'dashboard', affix: true }
      }
    ]
  },
  // {
  //   path: '/documentation',
  //   redirect: '/documentation/index',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/documentation/index'),
  //       name: 'Documentation',
  //       meta: { title: 'Documentation', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'Guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * 动态路由：需要进行角色判断（权限判断）的路由规则们。
 */
export const asyncRoutes = [
  {
    path: '/check',
    component: Layout,
    redirect: '/check/good',
    name: 'CheckManage',
    alwaysShow: true,
    meta: {
      title: '审核管理',
      icon: 'el-icon-s-goods',
      roles: ['admin']
    },
    children: [
      {
        path: 'good',
        component: () => import('@/views/check/check-good'),
        name: 'CheckGood',
        meta: {
          title: '商品审核',
          roles: ['admin']
        }
      }
    ]
  },
  // 业务开发
  {
    path: '/good',
    component: Layout,
    redirect: '/good/list',
    name: 'GoodManage',
    alwaysShow: true,
    meta: {
      title: '商品管理',
      icon: 'el-icon-s-goods',
      roles: ['editor']
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/good/good-list'),
        name: 'GoodList',
        meta: {
          title: '商品列表',
          roles: ['editor']
        }
      },
      {
        path: 'add',
        component: () => import('@/views/good/good-form'),
        name: 'GoodAdd',
        hidden: true,
        meta: {
          title: '商品新增',
          roles: ['editor']
        }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/good/good-form'),
        name: 'GoodEdit',
        props: true,
        hidden: true,
        meta: {
          title: '商品编辑',
          roles: ['editor']
        }
      }
    ]
  },
  /** 当某一条路由规则太长（意思是children太多），建议把它封装成路由模块 **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,
  // ...backupRoutes,

  // 重定向页面必须是最后一条路由规则
  { path: '*', redirect: '/404', hidden: true }
]

// 封装一个创建路由实例的工厂方法
const createRouter = () => new Router({
  // mode: 'history', // require service support
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  // 在这里，目前只考虑了那些静态路由。那此有权限的动态路由规则怎么办呢？
  // 在全局守卫中实现的，参见src/permission.js文件。
  // 知识点：router.addRoutes()可以向路由规则中手动添加新的路由规则。
  routes: constantRoutes
})

// 创建路由实例
const router = createRouter()

// 封装了一个方法，用于生成新的路由实例
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
