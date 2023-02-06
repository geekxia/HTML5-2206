<template>
  <el-select :clearable="clearable" :value="value" placeholder="请选择" @change="$emit(&quot;input&quot;, $event)">
    <el-option
      v-for="item in cates"
      :key="item._id"
      :label="item.cate_zh"
      :value="item.cate"
    />
  </el-select>
</template>

<script>
// import { getAllCates } from '@/api/good'
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    value: { type: String, default: '' },
    clearable: { type: Boolean, default: false }
  },
  data() {
    return {
      cate: ''
    }
  },
  computed: {
    ...mapState('good', ['cates'])
  },
  created() {
    this.getCates() // 触发vuex流程，把品类放在vuex中
  },
  methods: {
    ...mapActions('good', ['getCates'])
  }
}
</script>

<style lang="css" scoped>
</style>
