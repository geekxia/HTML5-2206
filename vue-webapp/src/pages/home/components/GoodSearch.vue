<template>
  <div class="search">
    <van-search
      shape="round"
      :placeholder="tip"
      background='#d81e06'
      :show-action='!isLogin'
      disabled
      @click='skipToSearch'
    >
      <template #left>
        <van-image src='/icon/nav.png' />
      </template>
      <template #action>
        <span class="login" @click='$router.push("/login")'>登录</span>
      </template>
      <template #left-icon>
        <span class="jd">JD</span>
      </template>
    </van-search>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('user', ['isLogin']),
    tip () {
      const tips = ['美的空调','小米电脑','华为电脑']
      return tips[Math.floor(Math.random()*tips.length)]
    }
  },
  methods: {
    skipToSearch () {
      console.log('---跳转', this.tip)
    }
  }
}
</script>

<style scoped>
.van-search__content {
  height: .8rem;
  font-size: .16rem;
  margin-left: .2667rem;
  line-height: .8rem;
}
.van-search__action {
  padding: 0  .2667rem;
}
</style>

<style lang="scss" scoped>
.search {
  .van-image {
    width: .6667rem;
    height: .6667rem;
  }
  .login {
    color: white;
  }
  .jd {
    color: red;
    font-size: .5067rem;
    font-weight: bold;
  }
}
</style>
