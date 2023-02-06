<template>

  <div class='app'>

    <!-- <router-link to='/home' active-class='on'>首页</router-link> -->
    <!-- <router-link :to='{path:"/home"}' replace active-class='on' tag='span'>首页</router-link> -->
    <!-- <router-link :to='{name:"qf"}' replace active-class='on' tag='span'>首页</router-link>
    <router-link to='/user' active-class='on'>我的</router-link> -->


    <!-- 视图容器：用于显示url配对成功的页面组件 -->
    <keep-alive :include='["HomePage"]'>
      <router-view></router-view>
    </keep-alive>

    <!-- <keep-alive> -->
      <!-- 命名视图 -->
      <!-- <router-view name='alive'></router-view> -->
    <!-- </keep-alive> -->

  </div>

</template>

<script>

// 选项
export default {
  watch: {
    $route () {
      console.log('--url变化了')
    }
  },
  mounted () {
    console.log('----$route', this.$route)
    console.log('----$router', this.$router)
  }
}
</script>

<style lang='scss'>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.app {
  height: 100%;
  // padding-bottom: 2rem;
}
[v-cloak] {
  display: none;
}
</style>
