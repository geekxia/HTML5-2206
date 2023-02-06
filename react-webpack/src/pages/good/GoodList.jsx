import { useSelector, useDispatch } from 'react-redux'
import { DatePicker, Button, Row, Col, Input, Table } from 'antd'
import { PlusOutlined, ReloadOutlined, ColumnHeightOutlined, SettingOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useMemo, useDeferredValue } from 'react'

import { useIntl, FormattedMessage } from 'react-intl'
import moment from 'moment'

import CateSelect from './components/CateSelect'
import './style.scss'
import { fetchGoodList } from '@/api/good'

const { RangePicker } = DatePicker



export default () => {

  const [params, setParams] = useState({
    page: 1,
    size: 10,
    cate: ''
  })
  const [name, setName] = useState('')
  const deferredName = useDeferredValue(name)

  const [total, setTotal] = useState(0)
  const [list, setList] = useState([])

  const intl = useIntl()
  const navigate = useNavigate()
  const { cates } = useSelector(state=>state.good)

  useEffect(()=>{
    fetchGoodList({...params, name: deferredName}).then(res=>{
      console.log('---商品列表', res)
      if (res.list) {
        // 在React18中，会自动合并，只re-render一次；如果是React17，这会re-render两次。
        setList(res.list)
        setTotal(res.total)
      }
    })
  }, [params, deferredName])

  // 表格的列表（如果要做自定义列，使用useMemo）
  const columns = useMemo(()=>{
    return [
      {
        title: '商品',
        align: 'center',
        dataIndex: 'name',
        render: (text, row, idnx) => {
          // do something
          return (
            <div className='good'>
              <img src={`http://localhost:9999${row.img}`} alt=""/>
              <div>{ text }</div>
            </div>
          )
        }
      },
      {
        title: '价格',
        dataIndex: 'price',
        align: 'center',
        render: text => (
          <div>{ `￥${Number(text).toFixed(2)}` }</div>
        )
      },
      {
        title: '品类',
        dataIndex: 'cate',
        align: 'center',
        render: cate => {
          if (cates.length > 0) {
            const [r] = cates.filter(ele=>ele.cate===cate)
            return <div>{ r ? r.cate_zh : null }</div>
          }
        }
      },
      {
        title: '是否热销',
        dataIndex: 'hot',
        align: 'center',
        render: text => (
          <div>{ text ? '是' : '否' }</div>
        )
      },
      {
        title: '状态',
        dataIndex: 'store_status',
        align: 'center',
        render: text => (
          <div>{ text ? '已上架' : '待上架' }</div>
        )
      },
      {
        title: '发布时间',
        dataIndex: 'create_time',
        align: 'center',
        render: text => {
          const m = moment(text)
          return (
            <>
              <div>{ m.format('YYYY年MM月DD') }</div>
              <div>{ m.format('HH:mm:ss') }</div>
            </>
          )
        }
      },
      {
        title: '操作',
        align: 'center',
        render: (_, row) => (
          <>
            <Button
              type='primary'
              size='small'
              onClick={()=>navigate('/good/edit/'+row._id)}>
              编辑
            </Button>
            <Button danger size='small' style={{marginLeft:'10px'}}>删除</Button>
          </>
        )
      }
    ]
  }, [cates, list]) // 当cates变化时，重新计算一个columns

  return (
    <div className='good-list'>

      <div className="filter">
        <Row align='middle'>
          <Col span={3}>
            <span>商品名称：</span>
          </Col>
          <Col span={4}>
            <Input
              value={params.name}
              allowClear
              onChange={ ev => {
                let val = ev.target.value
                setName(val.trim())
              }}
            />
          </Col>
          <Col span={3}>
            <span>商品品类：</span>
          </Col>
          <Col span={4}>
            <CateSelect
              hasAll
              value={params.cate}
              onChange={ cate => {
                setParams({...params, cate, page: 1 })
              }}
            />
          </Col>
        </Row>

      </div>


      <div className="table">
        <Table
          rowSelection={{
            type: 'checkbox',
            onChange: (keys, rows) => { console.log(keys, rows) },

          }}
          columns={columns}
          dataSource={list}
          rowKey='_id'
          title={()=>(
            <Row style={{padding: '15px 0'}}>
              <Col span={4} >商品列表</Col>
              <Col span={6} offset={14} style={{textAlign:'right'}}>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={()=>navigate('/good/add')}
                >新增</Button>
                <div className='table-title'>
                  <ReloadOutlined />
                  <ColumnHeightOutlined />
                  <SettingOutlined />
                </div>

              </Col>
            </Row>
          )}
          pagination={{
            total,
            current: params.page,
            pageSize: params.size,
            showSizeChanger: true,
            showTotal: (t, r) => (<div>{`第 ${r[0]}-${r[1]} 条/总共 ${t} 条`}</div>),
            pageSizeOptions: [2,5,10,15],
            onChange: (page, size) => {
              // console.log('---page', page)
              // console.log('---size', size)
              setParams({...params, page, size})
            }
          }}
        />
      </div>

    </div>

  )
}
