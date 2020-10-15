<template>
	<view class="statistic-container">
		<view class="form-wrap">
			<view class="statistic-type">
				<view class="income active">收入</view>
				<view class="spend">支出</view>
			</view>
			<picker
				mode="date"
				fields="month"
				:value="date"
				:start="startDate"
				:end="endDate"
				@change="onDateChange">
				<view class="calendar">{{ date }}</view>
			</picker>
		</view>
		
		<statistic-chart />
		
		<view class="classify-wrap">
			<view class="classify" v-for="(item, index) in 5" :key="index">
				<view class="title">
					<view class="iconfont icon-yaowan"></view>
					<view class="title-text">药品</view>
				</view>
				<view class="scale">33.5%</view>
				<view class="total">560.00</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	import StatisticChart from '@/components/StatisticChart'

	export default {
		data() {
			return {
				date: '2000-01-01',
				startDate: '2000-01-01',
				endDate: '2000-01-01'
			}
		},
		components: {
			StatisticChart
		},
		created() {
			const date = new Date()
			const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}`
			this.date = currentDate
			this.endDate = currentDate
		},
		methods: {
			onDateChange(e) {
				this.date = e.target.value
			}
		}
	}
</script>

<style scoped>

	.statistic-container {
		padding: 16rpx 32rpx;
	}

	.statistic-container .form-wrap {
		display: flex;
		justify-content: space-between;
		padding-bottom: 32rpx;
	}

	.form-wrap .statistic-type {
		display: flex;
		width: 200rpx;
		border: solid 1px #188AFF;
		border-radius: 26px;
		overflow: hidden;
	}

	.form-wrap .calendar {
		width: 200rpx;
		height: 54rpx;
		line-height: 54rpx;
		font-size: 28rpx;
		text-align: center;
		border: solid 1px #188AFF;
		border-radius: 100rpx;
		color: #188AFF;
	}

	/* statistic in style */
	.statistic-type .income,
	.statistic-type .spend {
		flex: 1;
		height: 54rpx;
		line-height: 54rpx;
		font-size: 28rpx;
		text-align: center;
		color: #188AFF;
	}

	.statistic-type .active {
		color: #fff;
		background-color: #188AFF;
	}


	.chart-wrap {
		height: 400rpx;
		background-color: #eee;
	}

	.classify-wrap {
		padding-top: 32rpx;
	}

	.classify-wrap .classify {
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		padding: 32rpx;
		line-height: 60rpx;
		border-radius: 10px;
		margin-bottom: 28rpx;
		background-color: #fff;
	}

	.classify .title {
		display: flex;
	}

	.title .iconfont {
		width: 60rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 50%;
		color: #fff;
		background-color: #188AFF;
	}

	.title .title-text {
		padding-left: 16rpx;
	}
</style>
