<template>
	<view class="updata_log-container">
		<view class="log-wrap" v-for="(item, index) in updata_log" :key="index">
			<view class="log-header">
				<view class="log-icon"><view class="iconfont icon-date"></view></view>
				<view class="log-date">{{ item.date }}</view>
			</view>
			<view class="log-content">
				<view class="log-item" v-for="(twig, index) in item.logs" :key="index">
					<view class="log-item-label">{{ twig.lable }}</view>
					<view class="log-item-value">{{ twig.value }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				updata_log: [
					{
						date: '2020.10.29',
						logs: [
							{
								lable: '优化',
								value: '提高程序的稳定性'
							},
							{
								lable: '优化',
								value: '程序的流畅度'
							},
							{
								lable: '修复',
								value: '登录失败'
							}
						]
					},
					{
						date: '2020.10.29',
						logs: [
							{
								lable: '优化',
								value: '提高程序的稳定性'
							},
							{
								lable: '优化',
								value: '程序的流畅度'
							},
							{
								lable: '修复',
								value: '登录失败'
							}
						]
					},
					{
						date: '2020.10.29',
						logs: [
							{
								lable: '优化',
								value: '提高程序的稳定性'
							},
							{
								lable: '优化',
								value: '程序的流畅度'
							},
							{
								lable: '修复',
								value: '登录失败'
							}
						]
					},
					
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.updata_log-container {
		/* padding: 32rpx; */
	}
	.log-wrap {
		padding: 32rpx;
		border: solid 1px #eee;
		background-color: #fff;
	}
	.log-header {
		display: flex;
		align-items: center;
	}
	.log-icon {
		padding-right: 16rpx;
	}
	.log-content {
		padding: 16rpx 32rpx 0rpx 60rpx;
	}
	.log-item {
		display: flex;
		align-items: center;
		padding: 8rpx 0;
	}
	
	
	.iconfont {
		width: 60rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		font-size: 32rpx;
		border-radius: 50%;
		color: #fff;
		background-color: #188AFF;
	}
	.log-date {
		font-weight: 100;
		font-size: 48rpx;
	}
	.log-item-label {
		padding: 4rpx 32rpx;
		border-radius: 12px;
		font-size: 24rpx;
		color: #333;
		background-color: #eee;
	}
	.log-item-value {
		font-size: 28rpx;
		padding: 0 16rpx;
		color: #888;
	}
</style>
