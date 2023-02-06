import Layout from '@/layout'
import Login from '@/pages/login'

import {
  AreaChartOutlined,
  PayCircleOutlined
} from '@ant-design/icons'

import { FormattedMessage } from 'react-intl'

import Dashboard from '@/pages/dashboard'
import StudyRedux from '@/pages/redux'
import GoodList from '@/pages/good/GoodList'
import GoodForm from '@/pages/good/GoodForm'

// 静态的没有权限的路由
export const constantRoutes = [
  // 真正需要我们设计权限的地方，在children中！！
  { key: 1, path: '/',  element: <Layout />, children: [] },
  { key: 2, path: '/login', element: <Login /> },
]

// 动态的有权限的路由
export const asyncRoutes = [
  {
    key: 1001,
    path: '/dashboard',
    label: <FormattedMessage id='menu.dashboard' />,
    icon: <AreaChartOutlined />,
    element: <Dashboard />,
    // 纯粹是为了理解权限设计，这个meta是我们自定义的字段
    meta: {
      roles: ['admin', 'editor'],
      title: '首页'
    }
  },
  {
    key: 1002,
    label: <FormattedMessage id='menu.good' />,
    icon: <PayCircleOutlined />,
    meta: {
      roles: ['editor', 'admin']
    },
    children: [
      {
        key: 100201,
        path: '/good/list',
        label: <FormattedMessage id='menu.good.list' />,
        icon: null,
        element: <GoodList />,
        meta: {
          title: '商品列表'
        }
      },
      {
        key: 100202,
        path: '/good/add',
        label: <FormattedMessage id='menu.good.add' />,
        icon: null,
        element: <GoodForm />,
        hidden: true,
        meta: {
          title: '商品新增'
        }
      },
      {
        key: 100203,
        path: '/good/edit/:id',  // 动态路由（列表到详情页）
        label: <FormattedMessage id='menu.good.edit' />,
        icon: null,
        element: <GoodForm />,
        hidden: true,  // 如果等于true，表示不放在菜单上
        meta: {
          title: '商品编辑'
        }
      }
    ]
  }
]
