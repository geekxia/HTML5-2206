import { View } from '@tarojs/components'

import { useEffect, useState } from 'react'
import { useReady, useReachBottom, usePullDownRefresh } from '@tarojs/taro'

import { observer, inject } from 'mobx-react'
import './find.scss'

export default inject('store')(
  observer(
    ({ store }) => {

      const [page, setPage] = useState(1)
      const [count, setCount] = useState(1)

      useEffect(()=>{
        console.log('---准备在这里走mobx调接口', store)
        store.cnode.getList({ limit: 10, page })
      }, [page, count])

      useReachBottom(()=>{
        setPage(page+1)
      })

      usePullDownRefresh(()=>{
        store.cnode.resetList()
        setPage(1)
        setCount(count+1)
      })

      return (
        <View>
          {
            store.cnode.list.map(ele=>(
              <View className='row' key={ele.id}>{ ele.title }</View>
            ))
          }
        </View>
      )
    }
  )
)
