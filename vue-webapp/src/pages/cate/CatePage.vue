<template>
  <div class='cate'>
    <QfNavbar />
    <!-- v-model = :value + @input -->
    <LeftCate v-model='activeKey'  :cates='cates'></LeftCate>
    <RightSubCate :list='cache[activeKey]'></RightSubCate>
    <QfTabbar></QfTabbar>
  </div>
</template>

<script>
import { QfTabbar, QfNavbar } from '@/components'
import LeftCate from './components/LeftCate.vue'
import RightSubCate from './components/RightSubCate.vue'
import { fetchCates } from '@/utils/api'
import { mapActions, mapState, mapMutations } from 'vuex'
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
      activeKey: 0
    }
  },
  computed: {
    ...mapState('good', ['cache']),
    payload () {
      if (this.cates.length > 0) {
        const idx = this.activeKey
        return { activeKey: idx, cate: this.cates[idx].cate }
      } else {
        return { activeKey: 0, cate: '' }
      }
    }
  },
  async mounted () {
    // 变异步代码为同步代码
    const res1 = await fetchCates()
    this.cates = res1.list
    this.getList(this.payload)
  },
  watch: {
    // 怎么实现缓存？
    // 1、每次根据当前品类获取二级品类数据时，都把二级品类的数据保存在Vuex中。
    // 2、当activeKey发生变化时，先判断Vuex中有没有对应的缓存数据，如果有直接使用；如果没有则继续调接口。
    activeKey () {
      if (!this.cache[this.activeKey]) {
        this.getList(this.payload)
      }
    }
  },
  methods: {
    ...mapActions('good', ['getList']),
    ...mapMutations('good', ['cleanCache'])
  },
  // 组件销毁时清除Vuex缓存
  beforeDestroy () {
    this.cleanCache()
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
