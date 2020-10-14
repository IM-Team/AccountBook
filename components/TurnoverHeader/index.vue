<template>
	<view class="turnover-header">
		<view>
			<text class="month">10</text>
			<text>月结余</text>
		</view>
		<view class="over">90,683.00</view>
		<view class="compute">
			<view class="compute-item">
				<text class="income">收入</text>
				<text class="compute-price">5,000.00</text>
			</view>
			<view class="line"></view>
			<view class="compute-item">
				<text class="expenses">支出</text>
				<text class="compute-price">6,520.00</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {}
</script>

<style scoped>
	
	.turnover-header {
		padding: 64rpx 32rpx;
		border-radius: 16px;
		background-color: #fff;
	}
	
	.month {
		margin-right: 12rpx;
	}
	
	.over {
		margin: 16rpx 0 32rpx;
		font-weight: 100;
		line-height: 1;
		font-size: 52rpx;
	}
	
	.compute {
		display: flex;
		align-items: center;
		height: 32rpx;
		color: #757575;
	}
	
	.compute-item {
		display: flex;
		align-items: center;
	}
	
	.line {
		margin: 0 20rpx;
		width: 1px;
		height: 80%;
		background-color: #CCCCCC;
	}
	
	.expenses,
	.income {
		border-radius: 12px;
		padding: 4px 6px;
		margin-right: 10rpx;
		background-color: #188AFF;
		color: #fff;
		font-size: 24rpx;
		line-height: 1;
	}
	
	.expenses {
		background-color: #FF4949;
	}
	
	.compute-price {
		font-size: 28rpx;
		line-height: 1;
	}

</style>
