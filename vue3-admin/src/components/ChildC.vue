<template>
  <div>
    <div class="lang">
      <span
        v-for='item in langs'
        :key='item.id'
        v-text='item.label'
        :class='{"on":modelValue===item.value}'
        @click='langChange(item)'
      >
      </span>
    </div>
    <div>
      <!-- 对H5的单选按钮组来讲， v-model = :checked + @change -->
      <!-- 对H5的文本表单来讲，v-model = :value + @input -->
      <!-- 对H5的下拉框来讲，v-model = :value + @change -->
      <input type="radio" value='man' :checked='gender==="man"' @change='emit("update:gender", $event.target.value)' />男
      <input type="radio" value='woman' v-model='g' />女
      <input type="radio" value='unknow' v-model='g' />保密
    </div>
  </div>
</template>

<script setup>
  import { reactive, defineProps, defineEmits, computed } from 'vue'
  const langs = reactive([
    { id: 1, value: 'zh', label: '中文' },
    { id: 2, value: 'en', label: '英文' },
    { id: 3, value: 'fr', label: '法语' }
  ])
  const props = defineProps({
    modelValue: { type: String, default: 'zh' },
    modelModifiers: { default: () => ({}) },

    gender: { type: String, default: 'man' },
    genderModifiers: { default: () => ({}) }
  })
  const emit = defineEmits(['update:modelValue', 'update:gender'])
  const g = computed({
    get () {
      return props.gender
    },
    set (val) {
      const { qf, sz } = props.genderModifiers
      emit('update:gender', val)
    }
  })

  const langChange = (item) => {
    const { sort, trim } = props.modelModifiers
    // 如果sort为真，先处理排序，再回传给父组件
    // 如果trim为真，把字符串首尾空字符删除，再回传父组件
    emit("update:modelValue", item.value)
  }

  console.log('----props', props)
</script>

<style lang='scss'>
  .lang {
    span {
      cursor: pointer;
      padding: 20px;
    }
    span.on {
      color: red;
    }
  }
</style>
