// 导入createApp这个工厂方法，用于创建vue实例
import { createApp, h } from 'vue'
import { createPinia } from 'pinia'

// 导入根组件
import App from './App.vue'
import router from './router'

// 导入组件库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// const app = createApp(App)
const app = createApp({
  render: () => h(App)
})

// 全局指令
app.directive('login', function(el,binding){
  console.log('---el', el)
  console.log('---binding', binding)
})

// 注册全局数据
app.provide('$url', 'http://localhost:8888')

// 注册路由
app.use(router)
app.use(ElementPlus)
// 注册element-plus-icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  // console.log('---key', key)
  app.component(key, component)
}

// Pinia
const pinia = createPinia()
app.use(pinia)

// 在vue3中，只能使用$mount挂载，已经淘汰的el选项
app.mount('#app')
