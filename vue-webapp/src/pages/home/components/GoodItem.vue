<template>
  <div class="good" @click='skipTo'>
    <van-image :src='`http://localhost:9999${good.img}`' />
    <div v-text='good.name'></div>
    <div v-cloak>{{ good.price | rmb }}</div>
  </div>
</template>

<script>
export default {
  props: {
    good: { type: Object, required: true }
  },
  methods: {
    skipTo () {
      // MongoDB 用 _id 表示唯一标识
      this.$router.push(`/good/${this.good._id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.good {
  .van-image {
    width: 100%;
  }
  font-size: .4533rem;
}
</style>
