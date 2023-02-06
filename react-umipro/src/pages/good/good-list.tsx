import { FC, useEffect, useState } from 'react'
import { useIntl, useSelector, useDispatch } from 'umi'
import { Button } from 'antd'

const GoodList: FC<any> = () => {
  const intl = useIntl()
  const [page, setPage] = useState<number>(1)
  // console.log('---intl', intl)
  // 访问redux数据
  const { msg, list } = useSelector(state=>state.user)
  const dispatch = useDispatch()

  const change = () => {
    dispatch({ type: 'user/changeMsg', payload: '中秋节快乐'})
  }

  useEffect(()=>{
    dispatch({ type: 'user/getList', payload: {limit: 5, page} })
  }, [page])

  return (
    <div>
      <h1>商品列表 { msg }</h1>
      <Button type='primary' onClick={change}>问好</Button>
      <hr/>
      {
        list.map(ele=>(
          <div key={ele.id}>{ele.title}</div>
        ))
      }
      <Button type='primary' onClick={()=>setPage(page-1)}>上一页</Button>
      <Button type='primary' onClick={()=>setPage(page+1)}>下一页</Button>
    </div>
  )
}

export default  GoodList
