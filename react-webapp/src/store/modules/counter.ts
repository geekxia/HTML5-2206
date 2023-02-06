
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../index';

// 导入api方法
import { fetchCount } from '@/api';

// TS类型
export interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

// 子store的初始值
const initialState: CounterState = {
  value: 0,
  status: 'idle',
};

// 异步的action（由 createAsyncThunk 创建的）
// 如何使用这个action？在页面中， dispatch(action)
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount: number) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

// 创建子store（由 createSlice 创建）
export const counterSlice = createSlice({
  // 子store的命名空间
  name: 'counter',
  // 相当vuex中的state，具有响应式，可以组件共享
  initialState,
  // 同步的action，相当于vuex中的mutations
  // 在这里是可以直接修改state的，为什么呢？因为在@reduxjs/toolkit的背后已经集成了immer
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  // 异步的action，相当于vuex中的actions
  // 这些异步的action，是由 createAsyncThunk创建的
  extraReducers: (builder) => {
    builder.addCase(incrementAsync.fulfilled, (state, action: any) => {
        // 当这个异步action成功后，把后端数据直接放在state上。
        state.status = 'idle';
        state.value += action.payload;
      })
      // .addCase(incrementAsync.rejected, (state) => {
      //   state.status = 'failed';
      // })
      // .addCase(incrementAsync.pending, (state) => {
      //   state.status = 'loading';
      // })
  },
});

// 把同步action抛出去
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  };

// 抛出子store
export default counterSlice.reducer;
