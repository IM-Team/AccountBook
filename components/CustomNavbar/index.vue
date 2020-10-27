<template>
	<view class="navbar"
        :style="{ paddingTop: top + 'px' }"
        @click="gotoAccountBook">
		<text>默认账本</text>
        <text class="iconfont icon-right"></text>
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
        display: flex;
        align-items: center;
	}
	
	.icon-right {
		margin: 2px 0 0 6px;
		font-size: 28rpx;
	}
	
</style>
