<template>
	<view class="form-wrap">
		<view class="statistic-type">
			<view
	            class="income"
	            :class="{ active: currentIndex === 0 }"
	            @click="$emit('changeIndex', 0)">收入</view>
			<view
	            class="spend"
	            :class="{ active: currentIndex === 1 }"
	            @click="$emit('changeIndex', 1)">支出</view>
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
</template>

<script>
	
	export default {
		name: 'StatisticHeader',
		props: {
			currentIndex: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				date: '2000-01-01',
                startDate: '2000-01-01',
                endDate: '2000-01-01'
			}
		},
		created() {
			this.initDate()
		},
		methods: {
			initDate() {
                const { year, month } = this.$store.state.turnoverData
                this.date = `${year}-${month}`
				
				const curDate = new Date()
				this.endDate = `${curDate.getFullYear()}-${curDate.getMonth() + 1}`
			},
			onDateChange(e) {
                this.date = e.target.value
                this.$emit('changeDate', this.date)
			}
		}
	}
	
</script>

<style scoped>
	
	.form-wrap {
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
	
</style>
