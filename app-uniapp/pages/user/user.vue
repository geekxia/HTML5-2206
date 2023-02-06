<template>
	<view>
		个人中心
		<button @tap='skipIndex'>跳转</button>
		<view>{{ num }}</view>
		<button @click="add">自增</button>
	</view>
</template>

<script setup>
	import { ref, computed } from 'vue'
	import { useStore } from 'vuex'
	const store = useStore()
	console.log('---store', store)
	// const { study } = store.state
	
	// 如果遇到响应式问题，使用计算属性来访问store中的数据
	const num = computed(()=>store.state.study.count)
	
	const add = () => {
		// 走vuex流程
		store.commit('study/addCount', 5)
	}
	
	const skipIndex = () => {
		uni.navigateTo({
			url: '/pages/index/index?id=2022'
		})
	}
</script>

<style>

</style>
