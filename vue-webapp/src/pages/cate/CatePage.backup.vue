<template>
  <div class='cate'>
    <QfNavbar />
    <!-- v-model = :value + @input -->
    <LeftCate v-model='activeKey'  :cates='cates'></LeftCate>
    <RightSubCate :list='list'></RightSubCate>
    <QfTabbar></QfTabbar>
  </div>
</template>

<script>
import { QfTabbar, QfNavbar } from '@/components'
import LeftCate from './components/LeftCate.vue'
import RightSubCate from './components/RightSubCate.vue'
import { fetchCates, fetchGoodList } from '@/utils/api'
export default {
  name: 'CatePage',
  components: {
    QfTabbar,
    QfNavbar,
    LeftCate,
    RightSubCate
  },
  data () {
    return {
      cates: [],  // 品类数组
      list: [],    // 当前品类对应的商品数组
      activeKey: 0
    }
  },
  // mounted () {
  //   fetchCates().then(res=>{
  //     console.log('---所有品类', res)
  //     this.cates = res.list
  //     // 接着根据第一个品类调右侧接口
  //     fetchGoodList({cate:'hot'}).then(res=>{
  //       console.log('hot品类对应的商品数据', res)
  //       this.list = res.list
  //     })
  //   })
  // },
  async mounted () {
    // 变异步代码为同步代码
    const res1 = await fetchCates()
    this.cates = res1.list
    const res2 = await fetchGoodList({cate:'hot'})
    this.list = res2.list
  },
  watch: {
    activeKey () {
      // 当左侧高亮索引变化时，我要调接口重新渲染右侧组件
      const cate = this.cates[this.activeKey].cate
      fetchGoodList({cate}).then(res=>{
        this.list = res.list
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.cate {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
