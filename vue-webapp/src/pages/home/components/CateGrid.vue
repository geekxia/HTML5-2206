<template>
  <div>
    <van-swipe indicator-color="#d81e06">
      <van-swipe-item v-for='(item,idx) in cates' :key='idx'>
        <van-grid column-num='5' :border='false'>
          <van-grid-item v-for='c in item' :key='c.id'>
            <template>
              <div class="cate">
                <van-image :src='c.src' />
                <div v-text='c.cate' />
              </div>
            </template>
          </van-grid-item>
        </van-grid>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cates: [
        [
          { id: 1, cate: '京东超市', src: '//m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg '},
          { id: 2, cate: '京东超市', src: '//m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg '},
          { id: 3, cate: '京东超市', src: '//m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg '},
          { id: 4, cate: '京东超市', src: '//m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg '},
          { id: 5, cate: '京东超市', src: '//m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg '},
          { id: 6, cate: '京东超市', src: '//m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg '},
          { id: 7, cate: '京东超市', src: '//m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg '},
          { id: 8, cate: '京东超市', src: '//m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg '},
          { id: 9, cate: '京东超市', src: '//m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg '},
          { id: 10, cate: '京东超市', src: '//m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg '},
        ],
        [
          { id: 1, cate: '京东超市', src: '//m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg '},
          { id: 2, cate: '京东超市', src: '//m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg '},
          { id: 3, cate: '京东超市', src: '//m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg '},
          { id: 4, cate: '京东超市', src: '//m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg '},
          { id: 5, cate: '京东超市', src: '//m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg '},
          { id: 6, cate: '京东超市', src: '//m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg '},
          { id: 7, cate: '京东超市', src: '//m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg '},
          { id: 8, cate: '京东超市', src: '//m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg '},
          { id: 9, cate: '京东超市', src: '//m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg '},
          { id: 10, cate: '京东超市', src: '//m15.360buyimg.com/mobilecms/jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg '},
        ]
      ]
    }
  }
}
</script>

<style lang='scss' scoped>
.van-swipe {
  height: 4.32rem;
  overflow: hidden;
}
.van-grid {
  height: 4rem;
  .van-grid-item {
    height: 2rem;
  }
}
</style>

<style lang="scss" scoped>
.cate {
  text-align: center;
  font-size: 12px;
  .van-image {
    width: 1.0667rem;
    height: 1.0667rem;
  }
}
</style>
