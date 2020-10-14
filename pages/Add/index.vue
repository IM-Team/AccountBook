<template>
	<view class="add-container">
		<view class="add-header">
			<view class="tally-type">
				<view class="income active">收入</view>
				<view class="spend">支出</view>
			</view>
			<view class="computed">0.00</view>
			<view class="form-wrap">
				<view class="note block_gray"><text class="iconfont icon-beizhu">备注</text></view>
				<viewd class="form-right">
					<view class="date block_gray">
						<text class="iconfont icon-date">日期</text>
						今天
					</view>
					<view class="account-type block_gray">
						<text class="iconfont icon-zhanghu">账户</text>
						现金
					</view>
				</viewd>
			</view>
		</view>
		
		<view class="add-body">
			<swiper :indicator-dots="true">
				<swiper-item>
					<view class="swiper-row">
						<view class="swiper-item" v-for="(item, index) in 4" :key="index">
							<view class="iconfont icon-qian"></view>
							<view class="name">工资</view>
						</view>		
					</view>
					<view class="swiper-row">
						<view class="swiper-item" v-for="(item, index) in 4" :key="index">
							<view class="iconfont icon-qian"></view>
							<view class="name">工资</view>
						</view>		
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-row">
						<view class="swiper-item" v-for="(item, index) in 4" :key="index">
							<view class="iconfont icon-qian"></view>
							<view class="name">工资</view>
						</view>		
					</view>
					<view class="swiper-row">
						<view class="swiper-item" v-for="(item, index) in 4" :key="index">
							<view class="iconfont icon-qian"></view>
							<view class="name">工资</view>
						</view>		
					</view>
				</swiper-item>
			</swiper>
		</view>
		
	</view>
</template>

<script>
	export default {
		onShow() {
			// uni.navigateTo({
			//     url: './AddAccount'
			// });
		},
		created() {
			// wx.hideTabBar();
		}
	}
</script>

<style scoped>
	.add-header {
		padding: 32rpx;
		box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
	}
	.add-header .tally-type {
		display: flex;
		border: solid 1px #188AFF;
		border-radius: 100rpx;
		font-size: 28rpx;
		overflow: hidden;
	}
	.add-header .computed {
		font-size: 96rpx;
		padding: 48rpx 0;
	}
	.tally-type .income,
	.tally-type .spend{
		flex: 1;
		height: 66rpx;
		line-height: 66rpx;
		text-align: center;
		color: #188AFF;
	}
	.tally-type .active {
		color: #fff;
		background-color: #188AFF;
	}
	
	.add-header .form-wrap {
		display: flex;
		font-size: 24rpx;
	}
	.form-wrap .iconfont {
		padding-right: 10rpx;
		font-size: 24rpx;
		color: #999;
	}
	.form-wrap .note {
		margin-right: auto;
	}
	.form-wrap .form-right {
		display: flex;
	}
	.form-right .date {
		margin-right: 32rpx;
	}
	.block_gray {
		border-radius: 44rpx;
		padding: 8rpx 32rpx;
		background-color: #eee;
	}
	
	
	.add-body {
		padding: 32rpx
	}
	.add-body .swiper-row {
		display: flex;
		justify-content: space-around;
	}
	.add-body .swiper-item {
		text-align: center;
	}
	.swiper-item .iconfont {
		width: 90rpx;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 50%;
		font-size: 60rpx;
		text-align: center;
		color: #fff;
		background-color: #188AFF;
	}
</style>
