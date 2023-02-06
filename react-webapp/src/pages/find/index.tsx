import { FC, useState, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/hooks/tools'
import { getList, cleanList } from '@/store/modules/article'
import {  PullToRefresh, List, InfiniteScroll } from 'antd-mobile'

const Child: any  = (props: any) => {
  return <div>{props.name}</div>
}

const Find: FC = () => {

  const [page, setPage] = useState<number>(1)
  const dispatch = useAppDispatch()
  const list = useAppSelector(state=>state.article.list)

  useEffect(()=>{
    const params = { page, limit: 10 }
    dispatch(getList(params))
  }, [page])

  const load = () => {
    console.log('---触底了，分页')
    setPage(page+1)
    return Promise.resolve()
  }

  return (
    <PullToRefresh
      onRefresh={async () => {
        console.log('---触了下拉事件')
        dispatch(cleanList())
        setPage(1)
      }}
    >
      <Child name={'张三'} />
      <List>
        {list.map((item) => (
          <List.Item key={item.id}>
            <div style={{lineHeight: '80px'}}>{item.title}</div>
          </List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={load} hasMore={true} />
    </PullToRefresh>
  )
}

export default Find