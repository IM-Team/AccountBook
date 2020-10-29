<template>
	<view class="about_us-container">
		<view class="app-info">
			<view class="logo"><view class="iconfont icon-fenlei"></view></view>
			<view class="title">穷人日记</view>
			<view class="version">v1.0.0</view>
		</view>
		<view class="tips">
			<view class="copyright">Copyright&copy;2020.IM团队 版权所有</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.about_us-container {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}
	.app-info,
	.tips {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.app-info {
		flex: 5;
	}
	.tips {
		flex: 1;
		font-size: 28rpx;
	}
	.logo {
		width: 120rpx;
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		border-radius: 50%;
		margin-bottom: 16rpx;
		background-color: #188AFF;
	}
	.iconfont {
		color: #fff;
		font-size: 60rpx;
	}
	.title {
		font-size: 48rpx;
		margin-bottom: 32rpx;
	}
	.version {
		font-size: 32rpx;
		color: #333;
	}
	.copyright {
		color: #888;
	}
</style>
