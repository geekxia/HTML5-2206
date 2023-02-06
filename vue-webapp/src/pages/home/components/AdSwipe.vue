<template>
  <div class="swipe">
    <van-swipe :autoplay="3000" indicator-color='#d81e06'>
      <van-swipe-item v-for="item in images" :key="item.id">
        <img v-lazy="item.img" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  data () {
    return {
      images: [
        { id: 1, img: '//m15.360buyimg.com/mobilecms/s1062x420_jfs/t1/221811/25/11827/470923/621f1a8fEbc5fc995/bfd9bc5b7f5883e4.png!cr_1053x420_4_0!q70.jpg' },
        { id: 2, img: '//m15.360buyimg.com/mobilecms/jfs/t1/63295/16/17909/79051/62843bddEe38f7546/990e3fd36b2d9771.jpg!cr_1125x449_0_166!q70.jpg' },
        { id: 3, img: '//imgcps.jd.com/ling4/10033266441111/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-60541365d250103053e030ee/47aa09c3/cr_1125x449_0_166/s/q70.jpg' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.van-swipe {
  width: 9.3333rem;
  height: 3.7333rem;
  margin: 0 auto;
  img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: .08rem;
  }
}
.van-swipe__indicators {
  bottom: .1867rem;
}
</style>

<style lang="scss" scoped>
.swipe {
  width: 100%;
  height: 3.7333rem;
  overflow: hidden;
}
</style>
