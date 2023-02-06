<template>
  <div class='qf-navbar'>
    <van-nav-bar
      left-arrow
      fixed
      @click-left='back'
    >
      <template #right>
        <slot name='right'>
          <van-image src='/icon/more.png' />
        </slot>
      </template>
      <template #title>
        <slot>
          <van-search shape='round' />
        </slot>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  methods: {
    // 返回上一页
    back () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
.qf-navbar {
  height: 1.2267rem;
  overflow: hidden;
  .van-nav-bar__left {
    color: black;
    .van-icon {
      color: black;
    }
  }
}
.van-ellipsis {
  width: 6.9333rem;
  max-width: 100%;
}
</style>

<style lang='scss' scoped>
.van-nav-bar__right {
  padding-right: .1067rem;
  .van-image {
    width: .8rem;
    height: .8rem;
  }
}
.van-hairline--bottom::after {
  border-color: #ccc;
}
</style>
