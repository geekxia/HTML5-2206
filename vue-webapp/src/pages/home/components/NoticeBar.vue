<template>
  <div v-if='value'>
    <van-notice-bar
      background='#000000'
      color='#ffffff'
    >
      <template #right-icon>
        <div class="open">立即打开</div>
      </template>
      <template #left-icon>
        <div class="close">
          <img src="/icon/close.png" alt="" @click='$emit("input",false)' />
        </div>
      </template>
      <template>
        <div class="tip">
          <van-image src='//img11.360buyimg.com/jdphoto/s80x80_jfs/t27847/91/107794072/6854/14716732/5b850ecaN644d2983.png' />
          <span>打开京东APP，购物更轻松</span>
        </div>
      </template>
    </van-notice-bar>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Boolean, default: true }
  }
}
</script>

<style lang="scss">
.van-notice-bar {
  height: 1.2rem;
  padding-right: 0;
  padding-left: 0;
}
.van-notice-bar__wrap {
  text-align: center;
}
.van-notice-bar__content {
  width: 100%;
}
</style>

<!-- lang='scss'表示使用scss -->
<!-- scoped 表示局部样式 -->
<style lang='scss' scoped>
.open {
  background-color: red;
  color: white;
  height: 100%;
  line-height: 1.2rem;
  width: 2.5067rem;
  text-align: center;
}
.close {
  padding: 0 .2rem;
  img {
    width: .4rem;
    height: .4rem;
    display: inline-block;
  }
}
.tip {
  vertical-align: middle;
  text-align: left;
  .van-image {
    vertical-align: middle;
    width: .8rem;
    height: .8rem;
    margin-right: .4rem;
  }
}
</style>
