import { useEffect } from 'react'
import { Row, Col } from 'antd'

import LineChart from './echarts/LineChart'
import RaddarChart from './echarts/RaddarChart'
import BarChart from './bizcharts/BarChart'
import PieChart from './bizcharts/PieChart'
import './style.scss'

export default () => {

  return (
    <div className='dashboard'>
      {/* 第一行 */}
      <Row>
        <Col span={6}><div className='one' style={{marginLeft:0}}></div></Col>
        <Col span={6}><div className='one'></div></Col>
        <Col span={6}><div className='one'></div></Col>
        <Col span={6}><div className='one' style={{marginRight:0}}></div></Col>
      </Row>

      {/* 第二行 */}
      <Row>
        <Col span={24}>
          <div className='two'>
            <LineChart />
          </div>
        </Col>
      </Row>

      {/* 第三行 */}
      <Row>
        <Col span={8}>
          <div className='three' style={{marginRight:'20px'}}>
            <RaddarChart />
          </div>
        </Col>
        <Col span={8}>
          <div className='three'>
            <BarChart />
          </div>
        </Col>
        <Col span={8}>
          <div className='three' style={{marginLeft:'20px'}}>
            <PieChart />
          </div>
        </Col>
      </Row>
    </div>
  )
}
