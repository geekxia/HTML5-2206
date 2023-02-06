
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import './index.scss'

function Index (props) {

  console.log('---index props', props)

  const { counter } = props.store

  console.log('---counter', counter)

  const increment = () => {
    counter.increment(10)
  }

  const decrement = () => {
    counter.decrement(5)
  }

  const incrementAsync = () => {
    counter.incrementAsync()
  }

  return (
    <View className='index'>
      <View style={{color:'red',fontSize:'50rpx'}}>Hello 2206</View>
      <Button onClick={increment}>+</Button>
      <Button onClick={decrement}>-</Button>
      <Button onClick={incrementAsync}>Add Async</Button>
      <Text style={{color:'red',fontSize:'50rpx'}}>{counter.num}</Text>
    </View>
  )
}

export default inject('store')(observer(Index))
