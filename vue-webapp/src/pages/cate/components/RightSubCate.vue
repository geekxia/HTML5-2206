<template>
  <div class="right">
    <van-grid :column-num="3" :border='false'>
      <van-grid-item v-for='item in list' :key='item._id'>
        <template>
          <div class='cate'>
            <van-image :src='item.img' />
            <div v-text='item.name'></div>
          </div>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  props: {
    list: { type: Array, default () { return [] } }
  }
}
</script>

<style lang="scss" scoped>
.right {
  position: absolute;
  top: 1.2267rem;
  left: 2.2667rem;
  bottom: 1.3333rem;
  right: 0;
  overflow-y: scroll;
}
.right::-webkit-scrollbar{
  display:none;
}
.cate {
  .van-image {
    width: 1.8667rem;
    height: 1.8667rem;
  }
  font-size: .32rem;
  text-align: center;
}
</style>
