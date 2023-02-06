import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '@/store'

import '@/styles/app.scss'
import 'antd/dist/antd.variable.min.css'  // 为了实现动态主题

import Permission from './Permission'

// 根组件
function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <Permission />
      </Provider>
    </HashRouter>
  )
}

export default App
