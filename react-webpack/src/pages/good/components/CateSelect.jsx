import { Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useLayoutEffect } from 'react'

import { getCates } from '@/store/actions'

const { Option } = Select

export default ({value, onChange, hasAll}) => {

  const dispatch = useDispatch()
  const { cates } = useSelector(state=>state.good)

  useLayoutEffect(()=>{
    dispatch(getCates())
  }, [])

  return (
    <Select
      style={{width: '100%'}}
      value={value}
      onChange={onChange}
    >
      { hasAll && <Option value=''>全部</Option> }
      {
        cates.map(ele=>(
            <Option key={ele._id} value={ele.cate}>{ele.cate_zh}</Option>
        ))
      }
    </Select>
  )
}
