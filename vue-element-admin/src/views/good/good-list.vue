<template>
  <div class="good-list">
    <!-- 筛选面板 -->
    <el-row type="flex" align="middle">
      <el-col :span="24">
        <el-input v-model.trim="name" clearable placeholder="请输入内容" style="width:135px;" />

        <CateSelect v-model="cate" clearable />

        <el-date-picker
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
        <el-button type="primary" icon="el-icon-search" @click="panelHandle(1)">搜索</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="panelHandle(2)">添加</el-button>
        <el-button type="primary" icon="el-icon-download" @click="panelHandle(3)">导出</el-button>
        <el-checkbox label="审核人" style="marginLeft:20px;" />
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table
      :data="list"
      style="width:100%; marginTop:20px;"
      border
      highlight-current-row
      @sort-change="tableSortChange"
    >
      <el-table-column
        label="序号"
        align="center"
        sortable="custom"
        prop="id"
        :sort-method="(a,b)=>(a.id-b.id)"
        width="120"
      >
        <template slot-scope="{row, $index}">
          <div>{{ $index+1 }}</div>
        </template>
      </el-table-column>

      <el-table-column
        prop="name"
        label="商品"
        align="center"
      >
        <template slot-scope="{row}">
          <div class="good">
            <img :src="(`http://localhost:9999${row.img}`)">
            <div>{{ row.name }}</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        prop="price"
        label="价格"
        align="center"
      >
        <template slot-scope="{row}">
          <div>{{ `￥${row.price.toFixed(2)}` }}</div>
        </template>
      </el-table-column>

      <el-table-column
        prop="cate"
        label="品类"
        align="center"
      >
        <template slot-scope="{row}">
          <div>{{ cate2ZH(row.cate) }}</div>
        </template>
      </el-table-column>

      <el-table-column
        prop="hot"
        label="是否热销"
        align="center"
      >
        <template slot-scope="{row}">
          <div>{{ row.hot?'是':'否' }}</div>
        </template>
      </el-table-column>

      <el-table-column
        prop="create_time"
        label="发布时间"
        align="center"
      >
        <template slot-scope="{row}">
          <div>{{ row.create_time | time }}</div>
        </template>
      </el-table-column>

      <el-table-column
        prop="check_status"
        label="商品状态"
        align="center"
      >
        <template slot-scope="{row}">
          <div>{{ row.check_status?'已上架':'待审核' }}</div>
        </template>
      </el-table-column>

      <el-table-column
        prop="address"
        label="操作"
        align="center"
        width="230"
      >
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="rowHandle(1, row)">编辑</el-button>
          <el-button v-if="row.published" size="mini" @click="rowHandle(2)">详情</el-button>
          <el-button v-else v-permission="[&quot;admin&quot;]" type="success" size="mini" @click="rowHandle(3)">审核</el-button>
          <el-button type="danger" size="mini" @click="rowHandle(4, row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-pagination
      style="marginTop:20px;"
      :current-page="page"
      :page-sizes="[2, 5, 10, 20]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      background
      :total="total"
      @current-change="pageChange"
      @size-change="sizeChange"
    />
  </div>
</template>

<script>
import CateSelect from './components/CateSelect.vue'
import { getGoodList, goodDel } from '@/api/good'
import { mapState } from 'vuex'

// cnpm i moment -S
import moment from 'moment'

export default {
  components: { CateSelect },
  // 局部过滤器
  filters: {
    time(value) {
      // do something
      return moment(value).format('MM月DD日 HH:mm')
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      size: 10, // 表示每次向后端请求几条数据
      page: 1, // 表示分页的页码
      cate: '', // 品类
      name: '', // 模糊查询
      count: 0 // 计数器
    }
  },
  computed: {
    ...mapState('good', ['cates'])
  },
  watch: {
    count() {
      this.getList()
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const params = {
        page: this.page,
        size: this.size,
        cate: this.cate,
        name: this.name
      }
      getGoodList(params).then(res => {
        console.log('----商品列表', res)
        if (res.data && res.data.list) {
          this.list = res.data.list
          this.total = res.data.total
        }
      })
    },
    cate2ZH(cate) {
      const res = this.cates.filter(ele => ele.cate === cate)
      if (res.length === 1) {
        return res[0].cate_zh
      } else {
        return ''
      }
    },
    // 当表格列的排序发生变化时，在这里调接口处理数据
    tableSortChange(ev) {
      console.log('--- table sort change', ev)
    },
    pageChange(page) {
      console.log('---页码变了', page)
      //
      this.page = page
      this.count++
    },
    // 发现了一个规律：当size变化时，会导致page的变化。
    sizeChange(size) {
      console.log('---Size变了', size)
      this.size = size
      if (this.page === 1) {
        this.count++
      }
    },
    panelHandle(flag) {
      if (flag === 1) {
        this.count++
      } else if (flag === 2) {
        this.$router.push('/good/add')
      } else if (flag === 3) {
        console.log('---导出')
      }
    },
    rowHandle(flag, row) {
      if (flag === 1) {
        // 跳转编辑，动态路由传参
        this.$router.push('/good/edit/' + row._id)
      }
      if (flag === 4) {
        this.$confirm(`你确定要删除 ${row.name} 这条商品吗？`, '警告', {})
          .then(() => {
            console.log('确定删除')
            const ids = row._id
            goodDel(ids).then(res => {
              if (res.data) {
                this.count++
              }
            })
          })
          .catch(() => console.log('取消'))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.good-list {
  box-sizing: border-box;
  padding: 20px;
  .good {
    text-align: center;
    img {
      display: inline-block;
      width: 60px;
      height: 60px;
    }
  }
}
</style>
