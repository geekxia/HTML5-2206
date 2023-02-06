<template>
  <div>
    <!-- action 图片上传的接口地址 -->
    <!-- name 上传图片时的名称，后端用这个名称接收图片数据 -->
    <!-- 图片上传，也会遭遇浏览器的跨域拦截 -->
    <el-upload
      action="/api/v1/element/upload/img"
      name="good"
      drag
      multiple
      :show-file-list="false"
      :on-success="imgSuccess"
    >

      <template #trigger>
        <div v-if="value">
          <el-image :src="(`http://localhost:9999${value}`)" fit="fill" />
        </div>
        <div>
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </div>
      </template>

      <template #tip>
        <div>
          只能上传jpg/png文件，且不超过500kb
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'ImgUpload',
  props: {
    // 父组件组件上 v-model给的值
    value: { type: String, default: '' }
  },
  methods: {
    imgSuccess(response) {
      // 这个response，指的是图片上传成功后，后端返回回来的图片信息
      if (response.data && response.data.img) {
        const img = response.data.img
        console.log('---图片上传成功', img)
        // 接着要把这个可访问的图片地址回传给父组件
        this.$emit('input', img)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-image {
  display: block;
  width: 100%;
  cursor: pointer;
}
</style>
