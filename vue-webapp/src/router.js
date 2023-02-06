import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter) // <router-link> <router-view> $route $router

// ()=>import()动态导入语法，目前ECMAScript还不支持这个语法
// 异步组件，在Vue凡是动态导入的组件，都可以被称之为异步组件
// 当webpack打包时，Webpack只要遇到()=>import()就会把这个文件背后的依赖独立一个新的js文件，这个技术就叫做代码分割技术。
const HomePage = ()=>import('./pages/home/HomePage.vue')
const CatePage = ()=>import('./pages/cate/CatePage.vue')
const CartPage = ()=>import('./pages/cart/CartPage.vue')
const UserPage = ()=>import('./pages/user/UserPage.vue')

const UserInfoPanel = ()=>import('./pages/user/components/UserInfoPanel.vue')
const UserOrderList = ()=>import('./pages/user/components/UserOrderList.vue')
const GoodInfo = ()=>import('./pages/home/GoodInfo.vue')

const LoginPage = ()=>import('./pages/user/LoginPage.vue')
const RegistPage = ()=>import('./pages/user/RegistPage.vue')

export const tabRoutes = [
  // 用人话解释这条路由规则：当url='/home'时，路由系统加载HomePage组件，将其显示在一个name=alive的视图容器中。
  {
    id: 1,
    text: '首页',
    icon: 'home',
    path: '/home',
    // 别名，是path的简写，所以也可以用作路由url进行访问
    alias: '/',
    // 命名路由，给路由规则取个名
    name: 'qf',
    component: HomePage,
    // components: {      
      // alive: HomePage  // 左k是视图容器的名称（命令视图）
    // },
  },
  {
    id: 2,
    text: '品类',
    icon: 'cate',
    path: '/cate',
    component: CatePage
  },
  {
    id: 3,
    text: '购物车',
    icon: 'cart',
    path: '/cart',
    component: CartPage
  },
  // 用人话说：当url='/user'时，路由系统加载UserPage组件，将其显示在name=default的视图容器中。
  {
    id: 4,
    text: '我的',
    icon: 'user',
    path: '/user',
    component: UserPage,
    children: [
      // 用人说解释：当用户访问url=/user/info时，路由系统在App.vue中找到名字叫default的视图容器显示UserPage页面，再在UserPage页面中找到一个名字叫default的子视图容器显示UserInfoPanel。
      { path: 'info', component: UserInfoPanel, meta: { x: 100 } },
      { path: 'order', component: UserOrderList, meta: { x: 200 } },
      // 嵌套视图中的重定向
      // { path: '/user*', redirect: '/user/info' }
    ],
    // 路由元信息（给当前路由规则添加额外的信息）
    // 在某种程序上，路由元信息是开发者自定义的额外的属性
    meta: { x: 1, y: 2 }
  },
]

// 创建路由系统
const router = new VueRouter({
  // mode: 'history',  // 路由模式
  mode: 'hash',
  // 路由规则（访问指定的url，加载对应的组件）
  // 需求：访问/home 加载Home组件；访问/user，加载User组件。。
  routes: [
    ...tabRoutes,
    // 这个:id就叫做动态路由，默认在使用this.$route.params接收
    // 如果在这里开启了props:true，那么还可以使用props来接收动态路由参数
    { path: '/good/:id', component: GoodInfo, props: true },
    { path: '/login', component: LoginPage },
    { path: '/regist', component: RegistPage },
    // 重定向，一定要重定向到一个已经定义过的路由上
    { path: '/*', redirect: '/' }
  ]
})

// 全局守卫（鉴权、权限设计）
const authPages = ['/cart', '/user']  // 需要鉴权的页面

router.beforeEach((to,from,next)=>{
  // console.log('--to', to)
  // console.log('--from', from)
  // 判断用户是否登录的这个表达式，必须写在beforeEach的内部，以保证每次页面切换时都实时检测用户是否登录了。
  const isLogin = store.getters['user/isLogin']
  // 判断你要去哪里？
  if (authPages.includes(to.path)) {
    // 如果你去的是有权限的页面，判断你是否登录了？
    if (isLogin) {
      next()
    } else {
      // 跳转到登录页
      // next('/login')
      // next({path:'/login'})
      // location.href = '/#/login'
      router.push('/login')
    }
  } else {
    next()
  }

})

export default router
