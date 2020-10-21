<template>
	<view class="navbar" :style="{ paddingTop: top + 'px' }" @click="gotoAccountBook">
		默认账本
	</view>
</template>

<script>
	
	export default {
		name: 'Navbar',
		props: {
			top: {
				type: Number,
				required: true
			}
		},
		methods: {
			gotoAccountBook() {
				uni.navigateTo({
					url: '/pages/AccountBook/index'
				})
			}
		}
	}
	
</script>

<style scoped>
	
	.navbar {
		width: 100%;
		height: 44px;
		background-color: #fff;
		padding: 0 32rpx;
		position: fixed;
		top: 0;
		left: 0;
		line-height: 34px;
	}
	
</style>
