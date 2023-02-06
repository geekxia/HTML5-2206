import App from './App'

import store from './store'

// 现在确定了使用 Vue3+小程序风格
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  return {
    app,
	store
  }
}