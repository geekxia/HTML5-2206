import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// 导入api方法
import { fetchList } from '@/api';

// 自定义TS类型（数据结构）
export interface State {
  list: Array<API.Article>
}

// 子store的初始值
const initialState: State = {
  list: []
};

// 异步action（给组件用）
// dispatch(getList({limit:5}))
export const getList: any = createAsyncThunk(
  'article/list',
  async (params: any) => {
    const list = await fetchList(params);
    // The value we return becomes the `fulfilled` action payload
    console.log('---文章列表', list)
    return list
  }
);

// 创建子store（由 createSlice 创建）
const slice = createSlice({
  // 子store的命名空间
  name: 'article',
  // 相当vuex中的state，具有响应式，可以组件共享
  initialState,
  // 同步的action，相当于vuex中的mutations
  // 在这里是可以直接修改state的，为什么呢？因为在@reduxjs/toolkit的背后已经集成了immer
  reducers: {
    cleanList: (state) => {
      state.list = []
    }
  },
  // 异步的action，相当于vuex中的actions
  // 这些异步的action，是由 createAsyncThunk创建的
  extraReducers: (builder) => {
    builder.addCase(getList.fulfilled, (state, action: any) => {
      console.log('---action', action)
        // 当这个异步action成功后，把后端数据直接放在state上。
        // state.status = 'idle';
        // state.value += action.payload;
        state.list = [...state.list, ...action.payload]
      })
  },
});

// 把同步action抛出去
export const { cleanList } = slice.actions;

// 抛出子reducer
export default slice.reducer
