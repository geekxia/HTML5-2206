import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

// 如果报TS错误，安装 cnpm i @types/redux-logger -D
import logger from 'redux-logger'

import counter from './modules/counter';
import article from './modules/article';

// 创建store，这是@reduxjs/toolkit玩法
// 在这个store背后已安装过了redux-thunk、immer。
const store = configureStore({
  // 合并reducer(合并子store)
  reducer: {
    counter, article
  },
  // 因为 @reduxjs/toolkit背后已经有一些中间件了，一定要这样地配置其它中间件
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
  middleware: (getDefaultMiddleware) => [...(getDefaultMiddleware()), logger]
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store
