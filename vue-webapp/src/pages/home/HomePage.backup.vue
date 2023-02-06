<template>
  <div class='home'>
    <!-- 当通知栏被关闭后，不再弹出；直到浏览器缓存被清除后，才会再次弹出。 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">

      <NoticeBar v-model='show'></NoticeBar>
      <GoodSearch />
      <AdSwipe />
      <CateGrid />

      <!-- immediate-check，用于关闭List组件的初始化滚动位置检测 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check='false'
      >
        <GoodList :list='list' />
      </van-list>
    </van-pull-refresh>

    <QfTabbar />
  </div>
</template>

<script>

import { QfTabbar } from '@/components'
import NoticeBar from './components/NoticeBar.vue'
import AdSwipe from './components/AdSwipe.vue'
import GoodSearch from './components/GoodSearch.vue'
import CateGrid from './components/CateGrid.vue'
import GoodList from './components/GoodList.vue'

import { fetchGoodList } from '@/utils/api'

export default {
  name: 'HomePage',
  components: {
    QfTabbar,
    NoticeBar,
    AdSwipe,
    GoodSearch,
    CateGrid,
    GoodList
  },
  data () {
    return {
      show: localStorage.getItem('noticeFlag') == null ? true : JSON.parse(localStorage.getItem('noticeFlag')),
      loading: false,
      finished: false,
      refreshing: false,
      list: [],    // 商品列表
      page: 1
    }
  },
  watch: {
    show () {
      localStorage.setItem('noticeFlag', this.show)
    }
  },
  mounted () {
    fetchGoodList({page:this.page}).then(res=>{
      console.log('---商品列表', res.list)
      // 把后端数据放在声明式变量上，进一步渲染页面
      this.list = res.list
    })
  },
  methods: {
    onRefresh () {
      console.log('---触发了下拉刷新')
      this.finished = false
      this.page = 1  // 重置页码
      fetchGoodList({page:this.page}).then(res=>{
        // 清空商品列表数组
        this.list = []
        // 把第一页数据放进数组
        const arr = res.list
        this.list = arr
        this.refreshing = false
      })
    },
    onLoad () {
      console.log('---触底加载')
      // 每次触底，page加1，相当于分页功能
      this.page++
      fetchGoodList({page:this.page}).then(res=>{
        // 调接口请求下一页数据
        const arr = res.list
        // 把数据追加到商品列表的数组中去
        this.list = [...this.list, ...arr]
        this.loading = false
        // 还要进一步判断数据库还有没有数据
        if (this.list.length >= res.total) {
          this.finished = true
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.home {
  // padding-bottom: 3rem;
}
</style>
