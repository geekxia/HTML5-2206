<template>
  <div class='detail'>
    <QfNavbar>
      <div v-text='info.name'></div>
    </QfNavbar>
    <div>
      <van-image :src='info.img' />
    </div>
    <div>
      <div v-text='info.desc'></div>
      <div>{{ info.price | rmb }} 元</div>
    </div>

    <van-goods-action>
      <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
      <van-goods-action-button type="warning" text="加入购物车" v-login @click='addToCart' />
      <van-goods-action-button type="danger" text="立即购买" v-login @click='buy' />
    </van-goods-action>
  </div>
</template>

<script>
import { QfNavbar } from '@/components'
import { fetchGoodInfo, fetchCartAdd } from '@/utils/api'
export default {
  name: 'GoodInfo',
  props: {
    id: { type: String, default: '' }
  },
  components: {
    QfNavbar
  },
  data () {
    return {
      info: {}
    }
  },
  mounted () {
    // 用于接收query参数
    // const id = this.$route.query.id
    // console.log('id', id)

    // 用于接收动态路由参数
    // const id = this.$route.params.id
    // console.log('id', id)

    // 使用props接收动态路由参数
    // console.log('id', this.id)

    fetchGoodInfo(this.id).then(res=>{
      console.log('---商品详情', res)
      this.info = res.info
    })
  },
  methods: {
    addToCart () {
      console.log('---调接口添加购物车')
      const data = {
        good_id: this.info._id,   // 商品_id
        num: 1
      }
      fetchCartAdd(data).then(res=>{
        // console.log('---添加购物车', res)
        if (res && res.info) {
          // 如果添加成功，跳转到购物车列表页面
          this.$router.push('/cart')
        }
      })
    },
    buy () {
      console.log('---立即购买')
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  font-size: .4rem;
}
</style>
