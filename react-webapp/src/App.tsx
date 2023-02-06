import { TabBar } from 'antd-mobile';
import { tabRoutes } from './pages';

import { HashRouter, Routes, Route, Link } from 'react-router-dom'

import { Provider } from 'react-redux';
import store from '@/store';

import '@/styles/index.css'

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
      <div className="App">
        
        <Routes>
          {
            tabRoutes.map(ele=>(
              <Route key={ele.key} path={ele.path} element={ele.element} />
            ))
          }
        </Routes>

        <div className="qf-tabbar">
          <TabBar>
            {tabRoutes.map(item => (
              <TabBar.Item 
                key={item.key} 
                icon={(active)=>(
                  <Link to={item.path} style={{color: active?'red':'black'}}>{ item.icon }</Link>
                )} 
                title={(active)=>(<div style={{color: active?'red':'black'}}>{item.title}</div>)} 
              />
            ))}
          </TabBar> 
        </div>     
      </div>
    </Provider>
    </HashRouter>
    
    
  );
}

export default App;
