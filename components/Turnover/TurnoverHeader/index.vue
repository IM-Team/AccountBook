<template>
	<view class="turnover-header">
		<view>
			<text class="month">10</text>
			<text>月结余</text>
		</view>
		<view class="over">{{ ruleOfThirds(surplus) }}</view>
		<view class="compute">
			<view class="compute-item">
				<text class="income">收入</text>
				<text class="compute-price">{{ ruleOfThirds(income) }}</text>
			</view>
			<view class="line"></view>
			<view class="compute-item">
				<text class="expenses">支出</text>
				<text class="compute-price">{{ ruleOfThirds(expense) }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	
	import { ruleOfThirds } from '@/utils/utils.js'
	
	export default {
		name: 'TurnoverHeader',
		props: {
			income: {
				type: String,
				default: '0.00'
			},
			expense: {
				type: String,
				default: '0.00'
            },
            surplus: {
                type: String,
                default: '0.00'
            }
        },
        methods: {
            ruleOfThirds,

        }
	}
</script>

<style scoped>
	
	.turnover-header {
		padding: 64rpx 32rpx;
		border-radius: 10px;
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
