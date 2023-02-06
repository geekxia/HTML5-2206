<template>
  <div class='backtop' v-show='show'>
    <van-image src='/icon/top.png' @click='$emit("back")' />
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
.backtop {
  width: 1.0133rem;
  height: 1.0133rem;
  position: fixed;
  bottom: 2.6667rem;
  right: .2667rem;
  border: .0267rem solid #666666;
  border-radius: 50%;
}
</style>
