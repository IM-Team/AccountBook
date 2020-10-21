<template>
	<view class="add-container">
		<view class="content">
			<view class="tally-type">
				<view class="income" :class="{active: tallyType === 0}" @click="hanleIncome()">收入</view>
				<view class="spend" :class="{active: tallyType === 1}" @click="handleSpend()">支出</view>
			</view>
			<edit-area :tally-type="tallyType" :input="digitList" />
			<type-swiper class="type-swiper" />
		</view>
		
		<keyboard class="keyboard" :digitList="digitList" @change="onChange"></keyboard>
		
	</view>
</template>

<script>
	
	import EditArea from '@/components/Add/EditArea'
	import TypeSwiper from '@/components/Add/TypeSwiper'
	import Keyboard from '@/components/Add/Keyboard'
	
	export default {
		data() {
			return {
				tallyType: 0,
				digitList: [0],			// 键盘栈
				isShowCommit: false,	// 确认按钮开关
			}
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
	
	.content {
		padding: 0 32rpx;
	}
	
	.tally-type {
		display: flex;
		/* margin-top: 32rpx; */
		border: solid 1px #188AFF;
		border-radius: calc(calc(100vw - 64rpx) / 2);
		font-size: 28rpx;
		overflow: hidden;
	}
	
	.tally-type .income,
	.tally-type .spend{
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
	.type-swiper {
		height: 200rpx;
		background-color: yellow !important;
	}
	
	.keyboard {
		flex: 1;
		max-height: 42%;
	}
</style>
