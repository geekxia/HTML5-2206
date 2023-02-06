<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
      >
        <el-sub-menu :index="sub.id+''" v-for='sub in asyncRoutes' :key='sub.id'>
          <template #title>
            <el-icon>
              <component :is='sub.icon' />
            </el-icon>
            <span>{{sub.text}}</span>
          </template>
          <el-menu-item v-for='item in sub.children' :key='item.id' :index="item.id+''">
            <!-- 在路由v4中，router-link已经没有tag属性了，建议使用插槽来改变渲染节点 -->
            <!-- 为了实现跳转，下面这个写法是固定的，少一个属性都不行 -->
            <router-link :to='item.path' custom v-slot='{navigate}'>
              <div @click='navigate'>{{item.text}}</div>
            </router-link>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <!-- 这里是给所谓的业务页面来显示 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
  import { asyncRoutes } from '@/router'
</script>

<style lang="scss" scoped>
</style>
