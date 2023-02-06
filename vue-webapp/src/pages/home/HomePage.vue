<template>
  <!-- 为了能够监听到scroll事件，一定要把.home变成绝对定位 -->
  <div class='home' @scroll='markScroll' ref='home'>
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

    <BackTop :show='top>700' @back='$refs.home.scrollTop=0' />

    <QfTabbar />
  </div>
</template>

<script>

import { QfTabbar, BackTop } from '@/components'
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
    GoodList,
    BackTop
  },
  data () {
    return {
      show: localStorage.getItem('noticeFlag') == null ? true : JSON.parse(localStorage.getItem('noticeFlag')),
      loading: false,
      finished: false,
      refreshing: false,
      list: [],    // 商品列表
      page: 1,
      count: 1,     // 计数器
      top: 0,       // 记录滚动位置
    }
  },
  watch: {
    show () {
      localStorage.setItem('noticeFlag', this.show)
    },
    count () {
      this.getList()
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      const params = { page: this.page, size: 6 }
      fetchGoodList(params).then(res=>{

        // 场景1：mounted时调接口
        if (!this.loading && this.page===1) {
          console.log('---商品列表', res.list)
          // 把后端数据放在声明式变量上，进一步渲染页面
          this.list = res.list
        }

        // 场景2：触底时调接口
        if (this.loading) {
          const arr = res.list
          // 把数据追加到商品列表的数组中去
          this.list = [...this.list, ...arr]
          this.loading = false
          // 还要进一步判断数据库还有没有数据
          if (this.list.length >= res.total) {
            this.finished = true
          }
        }

        // 场景3：下拉刷新时调接口
        if (this.refreshing) {
          // 清空商品列表数组
          this.list = []
          // 把第一页数据放进数组
          const arr = res.list
          this.list = arr
          this.refreshing = false
        }
      })
    },
    onRefresh () {
      console.log('---下拉刷新')
      this.finished = false
      this.page = 1  // 重置页码
      this.count++
    },
    onLoad () {
      console.log('---触底加载')
      // 每次触底，page加1，相当于分页功能
      this.page++
      this.count++
    },
    markScroll (ev) {
      // console.log('-- scroll ev', ev.srcElement.scrollTop)
      // 滚动时保留滚动位置（当首页下次激活时，我们需要手动滚动到该位置）
      this.top = ev.srcElement.scrollTop
    },
  },
  activated () {
    // 当首页激活时，手动把滚动条滚动到top的位置
    console.log('----activated')
    this.$refs.home.scrollTop = this.top
  }
}
</script>

<style lang='scss' scoped>
.home {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow-y: scroll;
}
</style>
