// 从node_modules中导入vue模块
import Vue from 'vue'
// 导入App组件（.vue单文件组织）
import App from './App.vue'
// 关于生产环境的vue提示
Vue.config.productionTip = false

// 导入路由实例
import router from './router'
// 导入store实例
import store from './store'

// 【推荐】上线打包时，都建议按需求导入，像下面这样一个一个地导入并注册
// import { Button } from 'vant'
// Vue.use(Button)

// 【开发】本地开发，为了提升开发效率，我先一次性注册。
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)  // 所有的vant组件都变成了全局组件
Vue.use(Lazyload)  // 提供一个全局指令 v-lazy

Vue.filter('rmb', val=>('￥'+Number(val).toFixed(2)))

Vue.directive('login', (el) => {
  // 判断用户是否登录了（这行表示式必须写在指令逻辑的内部）
  const isLogin = store.getters['user/isLogin']
  // 把v-login指定对应的这个DOM节点变成相对定位的
  el.style.position = 'relative'
  // 创建一个新div
  const oDiv = document.createElement('div')
  oDiv.style.position = 'absolute'
  oDiv.style.top = 0
  oDiv.style.bottom = 0
  oDiv.style.left = 0
  oDiv.style.right = 0
  oDiv.style.zIndex = 9999
  oDiv.addEventListener('click', ()=>{
    router.push('/login')
  })
  // 如果用户未登录，添加一个绝对定位div覆盖在当前节点的顶层
  if (!isLogin) {
    el.appendChild(oDiv)
  }
})

// 创建Vue响应式系统
const app = new Vue({
  // 用于把App组件渲染到#app这个挂载节点中去
  render: h => h(App),
  // el: '#app',
  // router: router
  router,  // 挂载路由系统
  store,   // 挂载状态管理
})

// console.log('--app', app)
app.$mount('#app')
