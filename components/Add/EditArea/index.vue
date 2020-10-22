<template>
	<view class="add-header">
		<view class="computed"
			:class="{
				isIcome: tallyType === 0,
				isSpend: tallyType === 1
			}">{{ input.join('') }}</view>
		<view class="form-wrap">
			<viewd class="form-right">
				<view class="date block_gray">
					<text class="iconfont icon-date">日期</text>
					<picker
						mode="date"
						fields="day"
						:value="date"
						:start="startDate"
						:end="endDate"
						@change="onDateChange">
						<view class="calendar">{{ date }}</view>
					</picker>
				</view>
				<view class="account-type block_gray">
					<text class="iconfont icon-zhanghu">账户</text>
					<text>{{ account }}</text>
				</view>
			</viewd>
		</view>
	</view>
</template>

<script>
	
	export default {
		name: 'EditArea',
		props: {
			tallyType: {
				type: Number,
				default: 0
			},
			input: {
				type: Array,
				default() { return [] }
			},
			timestamp: {
				type: Number,
				default: Date.now()
			}
		},
		data() {
			return {
				digitList: [0],			// 键盘栈
				date: '2000-01-01',
				startDate: '2000-01-01',
				endDate: '2000-01-01'
			}
		},
		created() {
			const date = new Date()
			const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
			this.date = currentDate
			
			// if ()
			
			console.log('edit');
			
			
			this.endDate = currentDate
		},
		computed: {
			value() {
				return parseFloat(this.input).toFixed(2)
			}
		},
		methods: {
			onDateChange(e) {
				this.date = e.target.value
			},
			foramtDate(timeStamp) {
				const date = new Date(timeStamp) 
				return ``
			}
		}
	}
	
</script>

<style scoped>
	
	.add-header .computed {
		box-sizing: border-box;
		font-size: 96rpx;
		/* padding: 40rpx 0; */
		padding-top: 40rpx;
		padding-bottom: 16rpx;
		overflow: scroll hidden;
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
		display: flex;
		margin-right: 32rpx;
	}
	.block_gray {
		border-radius: 44rpx;
		padding: 8rpx 32rpx;
		background-color: #eee;
	}
	
	.isIcome {
		color: #0EA391;
	}
	.isSpend {
		color: #FF4949;
	}
	
</style>
