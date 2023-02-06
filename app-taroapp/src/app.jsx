// Mobx
import { Provider } from 'mobx-react'
import store from './store'

function App(props)  {

  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  )
}

export default App
