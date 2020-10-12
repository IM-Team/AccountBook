<template>
	<view class="account_book-container">
		<view class="add-account_book">添加账本</view>
		<view class="card" v-for="(item, index) in 4" :key="index">
			<view class="title">默认账单</view>
			<view class="info">
				<view class="date">
					<text class="label">日期: </text>
					<text>2020年10月05日</text>
				</view>
				<view class="money">
					<view class="income">
						<text class="label">收入: </text>
						<text>23,300.00</text>
					</view>
					<view class="expenses">
						<text class="label">支出: </text>
						<text>12,000.00</text>
					</view>
				</view>
			</view>
			<view class="operate">
				<view class="delete-btn">删除</view>
				<view class="statistic-btn">统计</view>
			</view>
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

	.account_book-container {
		padding: 32rpx 32rpx 140rpx;
	}

	.add-account_book {
		width: 100%;
		height: 80rpx;
		background-color: #188AFF;
		border-radius: 40rpx;
		text-align: center;
		line-height: 80rpx;
		margin-bottom: 60rpx;
		color: #fff;
		font-size: 30rpx;
		font-weight: bold;
		box-shadow: 0 6px 12px rgba(24, 138, 255, .2);
	}
	
	.card {
		margin-top: 40rpx;
		box-shadow: 0 2px 6px rgba(0, 0, 0, .1);
		border-radius: 10px;
		overflow: hidden;
	}
	
	.label {
		margin-right: 12rpx;
	}
	
	.title {
		text-align: center;
		line-height: 1;
		padding: 20rpx;
		font-size: 36rpx;
		border-bottom: 1px solid #f4f4f4;
	}
	
	.info {
		padding: 20rpx;
	}
	
	.date,
	.income,
	.expenses {
		margin: 20rpx 0;
		line-height: 1;
	}
	
	.operate {
		display: flex;
		justify-content: space-around;
		border-top: 1px solid #f4f4f4;
	}
	
	.delete-btn,
	.statistic-btn {
		flex: 1;
		height: 74rpx;
		line-height: 74rpx;
		background-color: #fff;
		color: #188AFF;
		text-align: center;
	}
	
	.delete-btn {
		box-sizing: border-box;
		color: #FF4949;
		border-right: 1px solid #f4f4f4;
	}

</style>
