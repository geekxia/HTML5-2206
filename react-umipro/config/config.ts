// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
// 定制布局
import defaultSettings from './defaultSettings';
// 代理
import proxy from './proxy';
import accessRoutes from './accessRoutes'

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,  // 打包umi项目时给文件添加hash值
  antd: {},
  dva: {
    hmr: true,  // 支持Redux数据热更新
    immer: true, // 支持redux-saga中直接修改state
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 175,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    // 商品管理
    {
      path: '/good',
      icon: 'smile',
      name: 'good',
      access: 'xxx',
      routes: [
        {
          path: 'list',
          name: 'list',
          component: './good/good-list'
        },
        {
          path: 'add',
          name: 'add',
          component: './good/good-form'
        }
      ]
    },
    ...accessRoutes,

    // 文章管理
    {
      path: '/article',
      icon: 'smile',
      name: 'article',  // 用于显示在菜单上，也用于国际化
      routes: [
        {
          path: 'list',
          name: 'list',
          component: './article/ArticleList'
        }
      ]
    },
    {
      path: '/',
      redirect: '/dashboard/analysis',
    },
    {
      component: '404',
    },

  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  // umi代理配置
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
  // 路由模式的配置
  history: {
    type: 'hash'
  }
});
