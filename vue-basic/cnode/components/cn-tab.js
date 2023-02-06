Vue.component('cn-tab', {
  template: `
  <div>
    <span v-for='item in tabs' v-text='item.label' :class='{on:value===item.tab}' @click='$emit("input",item.tab)'></span>
  </div>
  `,
  mixins: [tabMixin],
  props: {
    value: { type: String, default: '' }
  }
})
