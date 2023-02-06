<template>
  <div class='nodata' v-show='show'>
    <van-image src='/icon/no-data.png' />
    <div>暂无数据</div>
  </div>
</template>

<script>
export default {
  props: {
    show: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss" scoped>
.nodata {
  text-align: center;
  font-size: .4533rem;
  color: #666666;
}
</style>
