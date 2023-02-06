```
<template>
  <div>
    <h1>首页</h1>

    <van-button type="primary">主要按钮</van-button>

    <div class="swiper"></div>

    <div class='avatar'>
      <img src="//img10.360buyimg.com/mobilecms/s360x360_jfs/t1/25864/33/16926/323683/62b57edaE9eab8f98/983051424d694240.jpg!q70.dpg.webp" alt="">
    </div>

    <!-- 第一个功能：使用vuex做了计数器 -->
    <h1 v-text='num'></h1>
    <input type="text" v-model.number='step' />
    <button @click='add'>自增</button>
    <hr>

    <!-- 第二个功能：使用vuex做文章列表 -->
    <div v-for='item in list' :key='item.id'>
      <span v-text='item.title'></span>
      --
      <span @click='skip(item)'>跳转</span>
    </div>
    <h1>文章总条数：<span v-text='total'></span></h1>
    <button @click='loadMore'>加载更多</button>
    <hr>

    <input type="text" v-model='msg' />

    <QfTabbar />

  </div>
</template>

<script>

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { QfTabbar } from '@/components'
export default {
  name: 'HomePage',
  components: {
    QfTabbar
  },
  data () {
    return {
      step: 1,
      page: 1
    }
  },
  // 计算属性
  computed: {
    // 这两个map*方法默认只支持get操作
    ...mapState('study', ['num', 'list']),
    ...mapGetters('study', ['total']),
    // 在v-model上使用Vuex中的数据
    msg: {
      get () {
        return this.$store.state.study.msg
      },
      set (val) {
        this.$store.commit('study/changeMsg', val)
      }
    }
  },
  methods: {
    ...mapMutations('study', ['addNum']),
    ...mapActions('study', ['getList']),
    skip (item) {
      // 编程式跳转
      console.log('--当前', item)
      // this.$router.push('/good?id='+item.id)
      this.$router.push('/good/'+item.id)
    },
    add () {
      // 不推荐，因为devtools没有记录
      // this.$store.state.num++
      // 通过commit('mutations方法', '参数')触发调用
      // this.$store.commit('study/addNum', this.step)
      this.addNum(this.step)
    },
    loadMore () {
      this.page++
      // this.$store.dispatch('study/getList', {page:this.page,limit:5})
      this.getList({page:this.page,limit:5})
    }
  },
  mounted () {
    console.log('---store msg', this.$store)
    // 通过dispatch('actions方法', '参数')触发调用
    // this.$store.dispatch('study/getList', {page:this.page,limit:5})
    this.getList({page:this.page,limit:5})
  }

}
</script>

<style lang="css">
body, html {
  padding: 0;
  margin: 0;
}
.avatar {
  width: 100%;
}
.avatar img {
  display: block;
  width: 10rem;
  height: 10rem;
}

.swiper {
  width: 10rem;
  height: 4.6933rem;
  background-color: red;
}
/* UI 750px      352px
-------   =   ----      352/75
10rem           ? */
</style>
```
