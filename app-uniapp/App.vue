<script setup>
	console.log('---app setup')
	import { onLaunch } from '@dcloudio/uni-app'
	onLaunch(()=>{
		uni.login({
			success (res) {
				console.log('--res code', res.code)
			}
		})
	})
</script>

<style>
	/*每个页面公共css */
</style>
