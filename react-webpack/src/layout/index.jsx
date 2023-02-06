import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

import { Layout, Menu } from 'antd';

import { ConfigProvider } from 'antd'
import { useSelector } from 'react-redux'

import { IntlProvider } from 'react-intl'

import React, { useState, useEffect } from 'react';
import './style.scss'

import QfSider from './QfSider'
import QfHeader from './QfHeader'
import QfContent from './QfContent'

// 组件库的国际化语言包
import zhCN from 'antd/es/locale/zh_CN'
import enGB from 'antd/es/locale/en_GB'
// 业务文字的国际化包
import zhCNQf from '@/locales/zh_CN'
import enGBQf from '@/locales/en_GB'

const langs = { zh: zhCN, en: enGB  }
const langsQf = { zh: zhCNQf, en: enGBQf }

const { Header, Sider, Content } = Layout;


export default () => {

  const [collapsed, setCollapsed] = useState(false)
  const { size, lang, color } = useSelector(state=>state.app)

  const resizeHandler = (ev)=>{
    // console.log('----ev', ev.srcElement.innerWidth)
    setCollapsed(ev.srcElement.innerWidth <= 1350)
  }

  useEffect(()=>{
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  useEffect(()=>{
    // 切换主题色
    ConfigProvider.config({
      theme: {
        primaryColor: color,
      },
    })
  }, [color])

  return (
    <ConfigProvider componentSize={size} locale={ langs[lang] }>
      <IntlProvider messages={ langsQf[lang] } locale={ lang }>
        <div className='qf-layout'>
          <Layout>

            <Sider trigger={null} collapsible collapsed={collapsed}>
              <QfSider value={collapsed} onChange={()=>setCollapsed(!collapsed)} />
            </Sider>

            <Layout style={{minWidth:'800px'}}>

              <Header style={{ padding: 0}}>
                <QfHeader value={collapsed} onChange={()=>setCollapsed(!collapsed)} />
              </Header>

              <Content
                style={{
                  padding: '20px',
                  background: '#eee',
                  minHeight: 280
                }}
              >
                <QfContent />
              </Content>
            </Layout>
          </Layout>
        </div>
      </IntlProvider>
    </ConfigProvider>

  )
}
