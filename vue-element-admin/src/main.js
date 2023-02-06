import Vue from 'vue'
// 引入cookie
import Cookies from 'js-cookie'
// 浏览器默认样式重置
import 'normalize.css/normalize.css' // a modern alternative to CSS resets

// 导入ElementUi包、样式、国际化的包
import Element from 'element-ui'
import './styles/element-variables.scss'
// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖
// import enLang from 'element-ui/lib/locale/lang/en'

// 导入自己的全局样式
import '@/styles/index.scss' // global css

// 导入根组件、导入stote实例、导入路由实例
import App from './App'
import store from './store'
import router from './router'

// 导入自已封装的icon图标库
import './icons' // icon
import './permission' // 权限设计（管理系统的最大特色）
// import './utils/error-log' // error log

// 导入过滤器
import * as filters from './filters' // global filters

/**
  关闭与开启Mock接口
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// 注册ElementUi组件库（注册后在页面中可以直接使用这些组件了）
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 全局指令
import permission from '@/directive/permission'
Vue.use(permission)

// 关闭生产环境下的vue提示
Vue.config.productionTip = false

// 创建Vue响应式系统并挂载到#app上
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
