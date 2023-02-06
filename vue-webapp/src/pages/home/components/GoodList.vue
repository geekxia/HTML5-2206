<template>
  <div class='goodlist'>
    <div class='row' v-for='i in row' :key='i'>
      <!-- list[0]  list[1]
      list[2]  list[3]
      list[4]  list[5] -->

      <GoodItem :good='list[i*2-2]' />
      <GoodItem :good='list[i*2-1]' />
    </div>
  </div>
</template>

<script>
import GoodItem from './GoodItem.vue'
export default {
  props: {
    // 当list是引用数据类型时，default必须写工厂函数
    list: { type: Array, required: true }
  },
  components: {
    GoodItem
  },
  computed: {
    // 当后端返回10条商品数据时，显示5行
    row () {
      return Math.floor(this.list.length / 2)
    }
  },
  methods: {
    // 跳转详情页
    skipToInfo (id) {
      this.$router.push(`/good/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.goodlist {
  // background-color: #eee;
  .row {
    height: 7.4667rem;
    display: flex;
    &>div {
      flex: 1;
      padding: .2667rem;
      // border: 1px solid red;
    }
  }
}
</style>
