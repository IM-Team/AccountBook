<template>
	<view class="setting-container">
		<view class="item" @click="onGotoUpdataLog">
			<im-cell title="更新记录" icon="icon-date" />
		</view>
		<view class="item" @click="onGotoAboutUs">
			<im-cell title="关于我们" icon="icon-me" />
		</view>
		<view class="logout-btn">退出登录</view>
	</view>
</template>

<script>
	import ImCell from '../../components/common/ImCell/index'
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			onGotoUpdataLog() {
				uni.navigateTo({ url: '/pages/UpdataLog/index' });
			},
			onGotoAboutUs() {
				uni.navigateTo({ url: '/pages/AboutUs/index' });
			}
		},
		components: {
			ImCell
		}
	}
</script>

<style scoped>
	.setting-container {
		padding: 32rpx;
	}
	.item {
		margin-bottom: 32rpx;
	}
	.logout-btn {
		padding: 28rpx 0;
		margin-top: 64rpx;
		border-radius: calc(100vw - (32rpx * 2));
		text-align: center;
		color: #FF4949;
		background-color: #fff;
	}
</style>
