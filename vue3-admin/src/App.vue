<template>
  <!-- 这个地方是给Layout或登录页用的 -->
  <router-view></router-view>
</template>

<script setup>

</script>

<style lang='scss'>
html, body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#app {
  height: 100%;
  &>.el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    border-bottom: 1px solid #ccc;
    line-height: 60px;
  }
}
</style>
