<template>
	<view class="add-container">
		<view class="add-header">
			<view class="tally-type">
				<view class="income active">收入</view>
				<view class="spend">支出</view>
			</view>
			<view class="computed">{{digitList.join('') || 0}}</view>
			<view class="form-wrap">
				<view class="note block_gray"><text class="iconfont icon-beizhu">备注</text></view>
				<viewd class="form-right">
					<view class="date block_gray">
						<text class="iconfont icon-date">日期</text>
						今天
					</view>
					<view class="account-type block_gray">
						<text class="iconfont icon-zhanghu">账户</text>
						现金
					</view>
				</viewd>
			</view>
		</view>
		
		<view class="add-body">
			<swiper :indicator-dots="true" style="height: 360rpx">
				<swiper-item>
					<view class="swiper-row">
						<view class="swiper-item" v-for="(item, index) in 4" :key="index">
							<view class="iconfont icon-qian"></view>
							<view class="name">工资</view>
						</view>		
					</view>
					<view class="swiper-row">
						<view class="swiper-item" v-for="(item, index) in 4" :key="index">
							<view class="iconfont icon-qian"></view>
							<view class="name">工资</view> 
						</view>		
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-row">
						<view class="swiper-item" v-for="(item, index) in 4" :key="index">
							<view class="iconfont icon-qian"></view>
							<view class="name">工资</view>
						</view>		
					</view>
					<view class="swiper-row">
						<view class="swiper-item" v-for="(item, index) in 4" :key="index">
							<view class="iconfont icon-qian"></view>
							<view class="name">工资</view>
						</view>		
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="add-footer">
			<view class="keyboard">
				<view class="keyboard-top">
					<view class="key-row">
						<button class="key-item" hover-class="active-gray" @click="onDigit(1)">1</button>
						<button class="key-item" hover-class="active-gray" @click="onDigit(2)">2</button>
						<button class="key-item" hover-class="active-gray" @click="onDigit(3)">3</button>
						<button class="key-item" hover-class="active-gray" @click="onDigit('+')">+</button>
					</view>
					<view class="key-row">
						<button class="key-item" hover-class="active-gray" @click="onDigit(4)">4</button>
						<button class="key-item" hover-class="active-gray" @click="onDigit(5)">5</button>
						<button class="key-item" hover-class="active-gray" @click="onDigit(6)">6</button>
						<button class="key-item" hover-class="active-gray" @click="onDigit('-')" style="line-height: 98rpx;">-</button>
					</view>
				</view>
				
				<view class="keyboard-bottom">
					<view class="keyboard-bottom-lf">
						<view class="key-row">
							<button class="key-item" hover-class="active-gray" @click="onDigit(7)">7</button>
							<button class="key-item" hover-class="active-gray" @click="onDigit(8)">8</button>
							<button class="key-item" hover-class="active-gray" @click="onDigit(9)">9</button>
						</view>
						<view class="key-row">
							<button class="key-item clear-btn" hover-class="active-clear" @click="onDigit(-1)">清除</button>
							<button class="key-item" hover-class="active-gray" @click="onDigit(0)">0</button>
							<button class="key-item" hover-class="active-gray" @click="onDigit('.')">.</button>
						</view>
					</view>
					<view class="keyboard-bottom-rg">
						<block v-if="1">
							<button class="commit-btn" @click="handleCalc()">=</button>
						</block>
						<block v-else>
							<button class="commit-btn">确认</button>
						</block>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				digitList: []
			}
		},
		computed: {
			
		},
		methods: {
			onDigit(digit) {
				switch(digit) {
					case -1:
					 	this.digitList = [];
						break;
					case '+':
						if(this.digitList.length !== 0 && this.digitList[this.digitList.length-1] !== '+') {
							if(this.digitList[this.digitList.length-1] === '-') {
								this.digitList.pop();
							}
							this.digitList.push(digit);
						}
						break;
					case '-':
						if(this.digitList.length !== 0 && this.digitList[this.digitList.length-1] !== '-') {
							if(this.digitList[this.digitList.length-1] === '+') {
								this.digitList.pop();
							}
							this.digitList.push(digit);		
						}
						break;
					case '.':
						if(this.digitList[this.digitList.length-1] !== '.') {
							if(isNaN(this.digitList[this.digitList.length-1])) {
								this.digitList.push(0);
							}
							this.digitList.push(digit);
						}
						break;
					default: 
						this.digitList.push(digit);
						break;
				}
			},
			handleCalc() {
				if(this.digitList.length !== 0) {
					let digitArry = JSON.stringify(this.digitList.join('')).match(/([\-|\d]\d+)|(\d\.\d+)|\d+/g);
					this.digitList = [digitArry.reduce((n, m) => Number(n) + Number(m))];
					// console.log(digitArry);
				}
			}
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
	.add-header {
		padding: 0 32rpx 0;
		/* box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1); */
	}
	.add-header .tally-type {
		display: flex;
		border: solid 1px #188AFF;
		border-radius: 100rpx;
		font-size: 28rpx;
		overflow: hidden;
	}
	.add-header .computed {
		height: 210rpx;
		box-sizing: border-box;
		font-size: 96rpx;
		padding-top: 48rpx;
		padding-bottom: 28rpx;
		overflow-x: scroll;
		overflow-y: hidden;
		/* color: #188AFF; */
	}
	.tally-type .income,
	.tally-type .spend{
		flex: 1;
		height: 66rpx;
		line-height: 66rpx;
		text-align: center;
		color: #188AFF;
	}
	.tally-type .active {
		color: #fff;
		background-color: #188AFF;
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
		margin-right: 32rpx;
	}
	.block_gray {
		border-radius: 44rpx;
		padding: 8rpx 32rpx;
		background-color: #eee;
	}
	
	
	.add-body {
		padding-top: 32rpx;
	}
	.add-body .swiper-row {
		display: flex;
		justify-content: space-around;
		padding-bottom: 32rpx;
	}
	.add-body .swiper-item {
		text-align: center;
	}
	.swiper-item .iconfont {
		width: 90rpx;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 50%;
		font-size: 60rpx;
		text-align: center;
		color: #fff;
		background-color: #188AFF;
	}
	.swiper-item .name {
		padding-top: 6rpx;
	}
	
/* keybord style */
	button {
		background-color: unset;
	}
	button::after {
		border: none;
	}
	.add-footer {
		flex: 1;
		border: solid 1px #EEEEEE;
		max-height: 600rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: #fff;
	}
	.keyboard {
		padding: 0 32rpx;
		box-sizing: border-box;
	}
	.key-row { 
		display: flex;
		padding: 8rpx 0;
	}
	.key-row .key-item {
		width: 104rpx;
		height: 104rpx; 
		line-height: 104rpx;
		font-size: 48rpx;
		text-align: center;
		border-radius: 8px
	}
	.keyboard-bottom {
		display: flex;
	}
	.keyboard-bottom .keyboard-bottom-lf {
		flex: 3;
	}
	.keyboard-bottom .keyboard-bottom-rg {
		flex: 1;
		margin: 8rpx 0;
	}
	.key-row .clear-btn {
		font-size: 24rpx;
		color: #FF4949;
		background-color: unset;
	}
	.active-gray {
		background-color: #EEEEEE;
	}
	.key-row .active-clear {
		color: #fff;
		background-color: #FF4949;
	}
	.commit-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 104rpx;
		height: 100%;
		font-size: 24rpx;
		border-radius: 8px;
		color: #fff;
		background-color: #188AFF;
	}
</style>
