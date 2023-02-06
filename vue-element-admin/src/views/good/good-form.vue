<template>
  <div class="good-form">
    <el-page-header :content="(`商品${id?&quot;编辑&quot;:&quot;新增&quot;}`)" @back="$router.back()" />
    <!-- 表单域 -->
    <el-form ref="goodForm" style="width:600px;marginTop:20px;" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">

      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ruleForm.name" :disabled="Boolean(id)" />
      </el-form-item>

      <el-form-item label="商品描述" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea" :rows="3" />
      </el-form-item>

      <el-form-item label="商品品类" prop="cate">
        <CateSelect v-model="ruleForm.cate" />
      </el-form-item>

      <el-form-item label="商品价格" prop="price">
        <el-input-number v-model="ruleForm.price" :precision="2" :step="0.1" :min="0" />
      </el-form-item>

      <el-form-item label="是否热销" prop="hot">
        <el-switch v-model="ruleForm.hot" />
      </el-form-item>

      <el-form-item label="商品图片" prop="img">
        <ImgUpload v-model="ruleForm.img" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit('ruleForm')">提交</el-button>
        <el-button @click="reset('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import CateSelect from './components/CateSelect.vue'
import ImgUpload from './components/ImgUpload.vue'
import { submitGood, getGoodInfo } from '@/api/good'

export default {
  name: 'GoodForm',
  components: { CateSelect, ImgUpload },
  props: {
    id: { type: String, default: '' }
  },
  data() {
    return {
      ruleForm: {
        name: '',
        desc: '',
        cate: '',
        price: 0,
        hot: false,
        img: ''
      },
      rules: {
        // 对name这个字段进行校验
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { pattern: /[\u4e00-\u9fa5]{4,8}/, message: '商品名称要求4~8个中文汉字', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请填写商品介绍', trigger: 'blur' },
          { min: 20, max: 30, message: '商品名称要求20~30个字符', trigger: 'blur' }
        ],
        cate: [
          { required: true, message: '请选择商品品类', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请填写商品价格', trigger: 'change' }
        ],
        img: [
          { required: true, message: '请上传商品图片', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    console.log('---id', this.id)
    // 当编辑时调接口
    if (this.id) {
      getGoodInfo(this.id).then(res => {
        console.log('---商品详情', res)
        if (res.data && res.data.info) {
          const info = res.data.info
          // 可能后端字段和前端字段对不住
          this.ruleForm = {
            name: info.name,
            desc: info.desc,
            cate: info.cate,
            price: info.price,
            hot: info.hot,
            img: info.img
          }
        }
      })
    }
  },
  methods: {
    submit() {
      // 因为表单是需要校验的。因此，我们应该先判断表单校验是否都成功了。
      this.$refs.goodForm.validate(valid => {
        if (valid) {
          // 说明所有表单的校验都是成功的
          const data = { ...this.ruleForm }
          if (this.id) data.id = this.id // 编辑
          submitGood(data).then(res => {
            // console.log('---提交', res)
            if (res.data && res.data.info) {
              this.$message({
                message: `恭喜你，商品${this.id ? '修改' : '新增'}成功`,
                type: 'success',
                duration: 1500,
                onClose: () => {
                  // 建议使用箭头函数，注意this指向问题
                  this.$router.back()
                }
              })
            }
          })
        } else {
          // 说明有表单验证是失败的
          console.log('error submit!!')
          return false
        }
      })
    },
    reset() {
      console.log('重置')
    }
  }
}
</script>

<style lang="scss" scoped>
.good-form {
  box-sizing: border-box;
  padding: 20px;
}
</style>
