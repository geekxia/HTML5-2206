<template>
  <div class='qf-cart'>
    <QfNavbar>
      <div>购物车</div>
      <template #right>
        <div class="app">
          <van-image src='/icon/app.png' @click='$router.replace("/")' />
        </div>
      </template>
    </QfNavbar>

    <NoData :show='show' />

    <van-swipe-cell v-for='(item,index) in list' :key='item._id'>
      <van-row  type='flex' align='center'>
        <van-col span="4">
          <van-checkbox
            checked-color="#ee0a24"
            v-model='item.checked'
            @click='rowClick'
          />
        </van-col>
        <van-col span="20">
          <van-card
            :num="item.num"
            :price="item.good_info.price"
            :desc="item.good_info.desc"
            :title="item.good_info.name"
            :thumb="item.good_info.img"
          >
            <template #footer>
              <van-button size="mini" @click='rowUpdate(item,-1,index)'>
                <span class='hot'>-</span>
              </van-button>
              <van-button size="mini" @click='rowUpdate(item,1,index)'>
                <span class='hot'>+</span>
              </van-button>
            </template>
          </van-card>
        </van-col>
      </van-row>
      <template #right>
        <van-button @click='rowDelete(item, index)' square text="删除" type="danger" style='height:100%;' />
      </template>
    </van-swipe-cell>

    <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit">
      <van-checkbox
        checked-color="#ee0a24"
        v-model="full"
        @click='fullClick'>
        全选
      </van-checkbox>
      <template #tip>
        你的收货地址不支持同城送, <span>修改地址</span>
      </template>
    </van-submit-bar>

  </div>
</template>

<script>
import { QfNavbar, NoData } from '@/components'
import { fetchCartList, fetchCartDel, fetchCartSubmit, fetchCardUpd } from '@/utils/api'

export default {
  name: 'CartPage',
  components: {
    QfNavbar,
    NoData
  },
  data () {
    return {
      full: false, // 是否全选
      list: [],
      show: false,  // 是否显示暂无数据
    }
  },
  computed: {
    total () {
      return this.list.reduce((prev,next)=>{
        // console.log('--next', next)
        // console.log('--prev', prev)
        // 每次循环时，判断当前商品有没有被勾选，如果勾选了，就叠加它的数量*商品价格
        return prev += next.checked ? next.num*next.good_info.price*100 : 0
      }, 0)
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      fetchCartList().then(res=>{
        console.log('---购物车列表', res)
        if (res && res.list) {
          // 对后端列表数据做二次处理
          let list = res.list
          list.forEach((ele,idx)=>{
            // 自定义添加一个布尔值属性，表示是否默认打勾
            list[idx]['checked'] = (Date.now() - ele.create_time) < 120000 ? true : false
          })
          this.list = list
          this.isFull()
          this.show = this.list.length === 0 // 调完接口后判断有没有数据
        }
      })
    },
    // 工具：判断是否是全选。（进入购物车页面时、行勾选时、删除成功时。。。）
    isFull () {
      const checkedArr = this.list.filter(ele=>ele.checked)
      this.full = checkedArr.length !==0 && checkedArr.length === this.list.length
    },
    fullClick () {
      this.list.forEach((ele,idx)=>{
        this.list[idx].checked = this.full
      })
    },
    rowClick () {
      // 手动判断是否全选了？
      this.isFull()
    },
    rowDelete (item, index) {
      console.log('---item', item)
      this.$dialog.confirm({
        title: '删除警告',
        message: `你确定要删除 ${item.good_info.name} 吗？`
      }).then(()=>{
        console.log('用户点击了确定')
        fetchCartDel(item._id).then(res=>{
          console.log('---删除', res)
          // 不做刷新，也不重新调列表接口
          if (res) {
            this.list.splice(index, 1)  // 手动删除，保留用户的勾选状态
            // 每次删除成功都，都要判断是否是全选
            this.isFull()
            this.show = this.list.length === 0
          }
        })
      }).catch(()=>{
        console.log('用户点击了取消')
      })
    },
    rowUpdate (item, n, index) {
      if (item.num===1 && n<0) {
        return this.$toast('商品数量不能为零')
      }
      const params = {
        cart_id: item._id,
        new_num: item.num + n
      }
      fetchCardUpd(params).then(res=>{
        console.log('---修改数量', res)
        if (res) {
          // 手动更新list列表中数量显示
          this.list[index].num = params.new_num
        }
      })
    },
    onSubmit () {
      console.log('---提交')
      if (this.total <= 0) {
        return this.$toast('请勾选你要提交的商品')
      }
      // 这个ids，指的是你要提交的多个商品记录，用 ; 拼接它们的 _id。
      const ids = this.list.reduce((prev,next)=>prev+=(next.checked?`;${next._id}`:''), '')
      fetchCartSubmit(ids).then(res=>{
        // 提交购物车成功，你可以放心地重新调接口
        if (res) this.getList()
      })
    }
  }
}
</script>

<style lang='scss'>
.van-checkbox {
  text-align: center;
}
.van-checkbox__icon {
  margin: 0 auto;
}
.van-card {
  background-color: white;
  padding-left: 0;
}
</style>

<style lang="scss" scoped>
.qf-cart {
  padding-bottom: 2rem;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;
}
.app {
  .van-image {
    width: .8rem;
    height: .8rem;
    margin-top: .2133rem;
  }
}
.hot {
  display: inline-block;
  padding: 0 .1333rem;
}
</style>
