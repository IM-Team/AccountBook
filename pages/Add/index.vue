<template>
	<view class="add-container">
		<view class="content">
			<view class="tally-type">
				<view class="income"
					:class="{active: tallyType === 0}"
					@click="hanleIncome">收入</view>
				<view class="spend"
					:class="{active: tallyType === 1}"
					@click="handleSpend">支出</view>
			</view>
			<edit-area
				:tally-type="tallyType"
				:input="digitList"
				:date="date"
				:account="account" />
			<type-swiper class="type-swiper" />
		</view>
		
		<view class="sub-container">
			<view class="note">
				<text class="iconfont icon-beizhu"></text>
				<text class="note-name">备注:</text>
				<input class="input" type="text" :value="noteInput" placeholder="请输入备注" />
			</view>
			<keyboard class="keyboard" @change="onChange"></keyboard>
		</view>
	</view>
</template>

<script>
	
	import EditArea from '@/components/Add/EditArea'
	import TypeSwiper from '@/components/Add/TypeSwiper'
	import Keyboard from '@/components/Add/Keyboard'
	
	
	/**
	 * 需要搜集的数据
	 * {String}price			// 支出 or 收入的金额
	 * {Number}account_type		// 资金账户 or 信用账户
	 * {Number}turnover_type	// 支出 or 收入
	 * {Number}date				// 产生流水的日期
	 * {String}note				// 备注
	 * {Icon}icon				// 图标信息 
		Icon {
			name,
			icon,
			color
			type
		}
	*/
	
	export default {
		data() {
			return {
				tallyType: 0,
				digitList: [0],
				noteInput: '',
				date: 0
			}
		},
		created() {
			uni.getStorage({
				key: 'tmpBillDetail',
				success: ({ data }) => {
					this.noteInput = data.note
					this.digitList = data.price.split('')
				}
			})
		},
		mounted() {
			// 组件挂在之前各自读取所需的数据
			uni.removeStorage({ key: 'tmpBillDetail' })
		},
		components: {
			EditArea,
			TypeSwiper,
			Keyboard
		},
		methods: {
			onChange(v) {
				this.digitList = v
			},
			hanleIncome() {
				this.tallyType = 0;
			},
			handleSpend() {
				this.tallyType = 1;
			},
		}
	}
</script>

<style scoped>
	
	.add-container {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		overflow: hidden;
	}
	
	.content { padding: 0 32rpx; }
	
	.tally-type {
		display: flex;
		border: solid 1px #188AFF;
		border-radius: calc(calc(100vw - 64rpx) / 2);
		font-size: 28rpx;
		overflow: hidden;
	}
	
	.tally-type .income,
	.tally-type .spend {
		flex: 1;
		height: 74rpx;
		line-height: 74rpx;
		text-align: center;
		color: #188AFF;
	}
	
	.tally-type .active {
		color: #fff;
		background-color: #188AFF;
	}
	
	.sub-container {
		flex: 1;
		max-height: 42%;
		display: flex;
		flex-direction: column;
	}
	
	.note {
		box-sizing: border-box;
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		padding: 0 32rpx;
		border-bottom: 1px solid #eee;
		background-color: #fff;
		font-size: 28rpx;
		color: #808080;
	}
	
	.icon-beizhu { font-size: 32rpx; margin-right: 4px; }
	.note-name { margin-right: 12px; }
	.keyboard { height: calc(100% - 80rpx); }
	
	.input {
		height: 100%;
		flex: 1;
		line-height: 80rpx;
	}
	
</style>
