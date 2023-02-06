import type { Settings as LayoutSettings } from '@ant-design/pro-layout';

import { PageLoading, WaterMark } from '@ant-design/pro-layout';

import type { RunTimeLayoutConfig } from 'umi';

import { history, Link, useIntl } from 'umi';

import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';

// 引入调接口的方法
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';

import { BookOutlined, LinkOutlined } from '@ant-design/icons';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
// 调接口获取用户信息
interface InitialState {
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}
export async function getInitialState(): Promise<InitialState> {

  console.log('---登录时，刷新时，都执行')

  const fetchUserInfo = async () => {
    try {
      // 获取用户
      const res = await queryCurrentUser();
      return res.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    // 获取用户信息
    const currentUser = await fetchUserInfo();
    //
    // 交给access.ts
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
// 定制布局
export const layout: RunTimeLayoutConfig = ({ initialState }) => {

  console.log('---生成布局')

  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      // content: initialState?.currentUser?.name,
      content: '千锋集团'
    },
    footerRender: () => <Footer />,
    // footerRender: () => <h1>吃月饼</h1>,

    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // settings: {},
    ...initialState?.settings,
    // 自定义渲染Sider菜单
    // menuRender: (props: any) => {
    //   console.log('---props', props)
    //   return null
    // },
    // menuDataRender: (menuData: any) => {},
    // waterMarkProps: <WaterMark content="千锋集团" />
  };
};
