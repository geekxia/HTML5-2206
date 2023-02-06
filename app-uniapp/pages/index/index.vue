<template>
	<view>
		<view :class='"num"'>{{num}}</view>
		<button @tap="num++">自增</button>
		<view v-for='item in list' :key='item.id'>
			<text>{{item.id}}</text>
			<text>{{item.name}}</text>
			<text>{{item.age}}</text>
		</view>
	</view>
</template>

<script setup>
	import { ref, reactive, onMounted } from 'vue'
	// 使用小程序风格的生命周期
	import { onLoad } from '@dcloudio/uni-app'
	const num = ref(0)
	const list = reactive([
		{ id: 1, name: '张三', age: 10 },
		{ id: 2, name: '张三', age: 10 },
		{ id: 3, name: '张三', age: 10 },
		{ id: 4, name: '张三', age: 10 },
	])
	onMounted(()=>console.log('---index mounted'))
	onLoad((opt)=>{ console.log('---路由参数', opt)})
</script>

<style>
	.num {
		text-align: center;
		font-size: 50rpx;
	}
</style>
