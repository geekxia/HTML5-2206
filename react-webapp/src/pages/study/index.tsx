import { useState } from 'react';
import { Button } from 'antd-mobile';

// 在非TS的redux架构中，我们是从react-redux中导入这两个API
// 在TS环境中，我们用下面这种方式导入
import { useAppSelector, useAppDispatch } from '@/hooks/tools';

// 这个感觉，相当于我们在redux传统架构中，导入action生成器方法
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from '@/store/modules/counter';

import styles from './style.css';

export default function Counter() {
  // 访问子store中的数据
  const count = useAppSelector(state=>state.counter.value);
  // 得到dispatch
  const dispatch = useAppDispatch();

  const [incrementAmount, setIncrementAmount] = useState<number>(2);

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div className='hello'>千锋欢迎你</div>
      <Button color='danger'>Danger</Button>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(Number(e.target.value))}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        {/*
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
        */}        
      </div>
    </div>
  );
}
