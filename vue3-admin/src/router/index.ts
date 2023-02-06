import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import Layout from '@/layout/index.vue'

export const asyncRoutes = [
  {
    id: 10,
    text: '好好学习',
    icon: 'Watch',
    path: '/study',
    alias: '/',     // 别名
    component: Layout,
    redirect: '/study/a',
    children: [
      { id: 101, text: 'A页面', path: '/study/a', component: () => import('@/pages/study/PageA.vue') },
      { id: 102, text: 'B页面', path: '/study/b', component: () => import('@/pages/study/PageB.vue') }
    ]
  },
  {
    id: 11,
    text: '全家桶',
    icon: 'Mouse',
    path: '/stack',
    component: Layout,
    redirect: '/stack/r',
    children: [
      { id: 111, text: '学习路由', path: '/stack/r', component: ()=>import('@/pages/stack/PageR.vue') },
      { id: 112, text: '状态管理', path: '/stack/s', component: ()=>import('@/pages/stack/PageS.vue') },
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),  // 带#的hash路由模式
  // history: createWebHistory(),         // 不带#的history路由模式
  routes: [
    ...asyncRoutes,
    { path: '/*', redirect: '/' }     // 重定向
  ]
})

router.beforeEach((to, from, next)=>{
  next()
})

export default router
