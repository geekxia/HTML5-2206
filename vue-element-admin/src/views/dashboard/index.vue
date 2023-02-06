<template>
  <div class="dashboard-container">
    <!-- 显示 -->
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

// admin用户的首页组件
import AdminDashboard from './admin'
// editor用户的首页组件
import EditorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { AdminDashboard, EditorDashboard },
  data() {
    return {
      currentRole: 'AdminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    // 如果vuex中的用户roles包含admin这个角色，就显示adminDashboard组件；反之显示editorDashboard组件。
    if (!this.roles.includes('admin')) {
      this.currentRole = 'EditorDashboard'
    }
  }
}
</script>
