import Study from './study'
import Find from './find'
import User from './user'

import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'

// 路由表
export const tabRoutes = [
  {
    key: 'study',
    title: '首页',
    icon: <AppOutline />,
    path: '/',
    element: <Study />
  },
  {
    key: 'find',
    title: '发现',
    icon: <MessageOutline />,
    path: '/find',
    element: <Find />
  },
  {
    key: 'user',
    title: '我的',
    icon: <MessageFill />,
    path: '/user',
    element: <User />
  }
]