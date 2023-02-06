Vue.component('cn-list', {
  // 注意单一根节点问题
  template: `
    <div>
      <div v-for='item in data' v-text='item.title'></div>
    </div>
  `,
  mixins: [tabMixin],
  props: {
    data: { type: Array, default: [] }
  }
})
