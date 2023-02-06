<template>
  <van-tabbar route active-color='#d81e06'>
    <van-tabbar-item
      icon="chat-o"
      v-for='item in tabRoutes'
      :key='item.id'
      :to='item.path'>
      <template>
        <!-- 前三个Tab的文字显示 -->
        <div v-if='item.path!=="/user"'>{{item.text}}</div>
        <!-- 当用户未登录时，第四个tab显示“未登录” -->
        <div v-if='!isLogin && item.path==="/user"'>未登录</div>
        <div v-if='isLogin && item.path==="/user"'>{{item.text}}</div>
      </template>

      <template #icon='{active}'>
        <img :src='`/icon/${item.icon}${active?"-on":""}.png`' alt="" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>

import { tabRoutes } from '@/router'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      tabRoutes,
      active: 0,
    }
  },
  computed: {
    ...mapGetters('user', ['isLogin'])
  }
}
</script>

<style lang="css">

</style>
