const app = new Vue({
  el: '#app',
  data () {
    return {
      list: [],
      tab: ''
    }
  },
  watch: {
    tab () {
      this.getList()
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      $.ajax({
        url: 'https://cnodejs.org/api/v1/topics',
        method: 'GET',
        data: {
          page: 1,
          tab: this.tab,  // 用最新的tab调接口
          limit: 5
        },
        // 注意this指向问题
        success: res => {
          console.log('res', res.data)
          this.list = res.data
        }
      })
    }
  }
})
