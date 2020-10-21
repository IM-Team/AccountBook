<template>
	<view class="account_book-container">
		<view class="add-account_book">添加账本</view>
		<view class="card" v-for="(item, index) in data" :key="index">
			<view class="title">{{ item.name }}</view>
			<view class="info">
				<view class="date">
					<text class="label">日期: </text>
					<text>{{ formatDate(item.date) }}</text>
				</view>
				<view class="money">
					<view class="income">
						<text class="label">收入: </text>
						<text>{{ item.income }}</text>
					</view>
					<view class="expenses">
						<text class="label">支出: </text>
						<text>{{ item.expense }}</text>
					</view>
				</view>
			</view>
			<view class="operate">
				<view class="delete-btn">删除</view>
				<view class="statistic-btn">编辑</view>
			</view>
		</view>
	</view>
</template>

<script>

	import res from './data.json'
	
	export default {
		data() {
			return {
				data: []
			}
		},
		created() {
			this.data = res.data
		},
		methods: {
			formatDate(timestamp) {
				const date = new Date(timestamp)
				return `${date.getFullYear()}年 ${date.getMonth() + 1}月 ${date.getDate()}日`
			}
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
		background-color: #fff;
	}
	
	.label {
		margin-right: 12rpx;
	}
	
	.title {
		text-align: center;
		line-height: 1;
		padding: 30rpx;
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
		height: 90rpx;
		line-height: 90rpx;
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
