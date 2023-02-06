import { Outlet } from 'react-router-dom'
import { SettingOutlined } from '@ant-design/icons'
import { Drawer, Row, Col } from 'antd'
import { FormattedMessage } from 'react-intl'
import { TwitterPicker } from 'react-color'
import { useSelector, useDispatch } from 'react-redux'

import { useState } from 'react'

import { switchColor } from '@/store/actions'

export default () => {
  const [visible, setVisible] = useState(false)
  const { color } = useSelector(state=>state.app)
  const dispatch = useDispatch()

  const close = () => {
    setVisible(false)
  }

  return (
    <div className='qf-content'>
      {/* 用于显示二级路由对应的视图组件 */}
      <Outlet />

      <div
        className='setting'
        onClick={()=>setVisible(true)}
        style={{ background: 'var(--ant-primary-color)' }}
      >
        <SettingOutlined />
      </div>
      <Drawer
        title={<FormattedMessage id='setting.title' />}
        placement='right'
        width={330}
        onClose={close}
        visible={visible}
        key='right'
      >
        <Row>
          <Col span={24}>主题色</Col>
        </Row>
        <Row style={{margin: '15px 0'}}>
          <Col span={24}>
            <TwitterPicker
              triangle='hide'
              color={color}
              onChangeComplete={({hex})=>dispatch(switchColor(hex))}
            />
          </Col>
        </Row>
      </Drawer>
    </div>
  )
}
