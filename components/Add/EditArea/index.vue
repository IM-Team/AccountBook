<template>
	<view class="add-header">
		<view class="computed"
			:class="{
				is_icome: info.turnover_type === 1,
				is_spend: info.turnover_type === 2
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
						:end="date"
						@change="onDateChange">
						<view class="calendar">{{ date }}</view>
					</picker>
				</view>
				<view class="account-type block_gray">
					<text class="iconfont icon-zhanghu">账户</text>
					<text>{{ info.account }}</text>
				</view>
			</viewd>
		</view>
	</view>
</template>

<script>
	
	export default {
		name: 'EditArea',
		props: {
			input: {
				type: Array,
				default() { return [] }
			}
		},
		data() {
			return {
				digitList: [0],
				date: '2000-01-01',
                startDate: '2000-01-01',
                info: {}
			}
		},
		created() {
            this.init()
		},
		methods: {
            init() {
                this.info = this.$store.getters.getBillDetail()
                const date = new Date(this.info.date)
                this.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            },
			onDateChange(e) {
                const date = new Date(e.target.value)

                this.date = e.target.value
                this.$emit('change-date', date.getTime())
			}
		}
	}
	
</script>

<style scoped>
	
	.add-header .computed {
		box-sizing: border-box;
		font-size: 96rpx;
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
	
	.form-wrap .note { margin-right: auto; }
	.form-wrap .form-right { display: flex; }
	
	.form-right .date {
		display: flex;
		margin-right: 32rpx;
	}
	.block_gray {
		border-radius: 44rpx;
		padding: 8rpx 32rpx;
		background-color: #eee;
	}
	
	.is_icome { color: #0EA391; }
	.is_spend { color: #FF4949; }
	
</style>
