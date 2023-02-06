<template>
  <div class="left" @scroll='markScroll' ref='box'>
    <van-sidebar v-model="activeKey">
      <van-sidebar-item v-for='item in cates' :key='item._id' :title='item.cate_zh' />
    </van-sidebar>
  </div>
</template>

<script>
export default {
  name: 'LeftCate',
  // props数据是不能直接修改的
  props: {
    cates: { type: Array, default () { return [] } },
    value: { type: Number, default: 0 }
  },
  computed: {
    activeKey: {
      get () {
        return this.value
      },
      set (newVal) {
        this.$emit('input', Number(newVal))
      }
    }
  },
  // data () {
  //   return {
  //     activeKey: 0,
  //   }
  // },
  // watch: {
    // activeKey () {
      // 当activeKey发生变化时，使用DOM方法把滚动条滚动指定的位置
      // this.$refs.box.scrollTop = 46*Number(this.activeKey)
    // }
  // },
  methods: {
    // 使用scroll事件记录手动滑动滚动条的实时位置
    markScroll () {
      // console.log('---滚动位置', ev.srcElement.scrollTop)
    }
  }
}
</script>

<style lang='scss'>
.van-sidebar {
  width: 100%;
  background-color: #eee;

  .van-sidebar-item {
    width: 100%;
    height: 1.2267rem;
    padding: 0;

    // line-height: 1.2267rem;
    .van-sidebar-item__text {
      line-height: 1.2267rem;
      text-align: center;
      display: block;
    }
  }
}
.van-sidebar-item--select::before {
  width: 0;
  height: 0;

}
.van-sidebar-item--select {
  color: red;
  background-color: white;
}
</style>
<style lang="scss" scoped>
.left {
  position: absolute;
  top: 1.2267rem;
  left: 0;
  bottom: 1.3333rem;
  width: 2.2667rem;
  overflow-y: scroll;
}
.left::-webkit-scrollbar{
  display:none;
}
</style>
