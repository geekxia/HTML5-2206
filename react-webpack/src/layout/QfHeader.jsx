import { Breadcrumb, Row, Col, Dropdown, Menu, Tooltip } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  FontSizeOutlined,
  TranslationOutlined
} from '@ant-design/icons'
import { FormattedMessage } from 'react-intl'

import screenfull from 'screenfull'

import useBreadcrumb from './useBreadcrumb'
import { switchSize, switchLang } from '@/store/actions'

// 收缩与展开
const Toggle = ({value, onChange}) => {
  return (
    <div onClick={onChange} className='toggle'>
      {
        /* React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => setCollapsed(!collapsed),
        }) */

        value ? <MenuUnfoldOutlined  /> : <MenuFoldOutlined />
      }
      </div>
  )
}

const sizes = ['large', 'middle', 'small']
const langs = [
  { value:'zh',label:'简体中文' },
  { value: 'en', label: 'English' }
]

// 页面组件
export default (props) => {

  const breads = useBreadcrumb()
  const navigate = useNavigate()  // 路由跳转API
  const [full, setFull] = useState(false)
  const { size, lang } = useSelector(state=>state.app)
  const dispatch = useDispatch()

  // 判断面包屑上的“项”是否需要发生路由跳转
  const isSkip = (route, idx) => {
    return route.path && idx!==breads.length-1
  }
  // 面包屑上的“项”的点击事件
  const skipTo = (route,idx) => {
    if (isSkip(route, idx)) {
      // navigate(route.path)  // $router.push()
      navigate(route.path, {replace: true})  // $router.replace()
    }
  }

  // 自定义方法渲染面包屑的“项”
  const renderBreads = () => {
    return breads.map((ele,idx)=>(
      <Breadcrumb.Item key={ele.key} onClick={()=>skipTo(ele,idx)}>
        <span style={{cursor: isSkip(ele,idx) ? 'pointer' : 'default'}}>{ ele.label }</span>
      </Breadcrumb.Item>
    ))
  }

  // 点击全屏切换
  const toggleFull = () => {
    if (screenfull.isEnabled) screenfull.toggle()
  }

  // 监听全屏切换事件（只监听一次）
  useEffect(()=>{
    screenfull.onchange((ev)=>{
      // console.log('---ev', ev)
      // console.log('---full', )
      setFull(screenfull.isFullscreen)
    })
  }, [])

  return (
    <div className='qf-header'>
      <Row>
        <Col span={18}>
          <Toggle {...props} />
          <Breadcrumb>
            { renderBreads() }
          </Breadcrumb>
        </Col>
        <Col span={6} style={{textAlign: 'right'}}>
          <div className='icons'>
            {/* 全屏操作 */}
            <span onClick={toggleFull}>
              { !full ? <FullscreenOutlined  /> : <FullscreenExitOutlined /> }
            </span>
            {/* 切换组件库组件大小 */}
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu
                  items={sizes.map(ele=>({
                    key: ele,
                    label: (
                      <div
                        style={{color: size===ele?'red':'black', textTransform: 'capitalize' }}
                        onClick={()=>dispatch(switchSize(ele))}
                      >{ ele }</div>
                    )
                  }))}
                />
              }
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
            >
              <Tooltip placement="bottom" title={<FormattedMessage id='header.size.title' />}>
                <FontSizeOutlined />
              </Tooltip>
            </Dropdown>

            {/* 国际化切换 */}
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu
                  items={langs.map(ele=>({
                    key: ele.value,
                    label: (
                      <div
                        style={{color: lang===ele.value?'red':'black' }}
                        onClick={()=>dispatch(switchLang(ele.value))}
                      >{ ele.label }</div>
                    )
                  }))}
                />
              }
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
            >
              <TranslationOutlined />
            </Dropdown>

          </div>
        </Col>
      </Row>
    </div>
  )
}
