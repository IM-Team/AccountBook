<template>
	<view class="keyboard-container">
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
					<block v-if="isShowCommit">
						<button class="commit-btn" @click="handleCalc()">=</button>
					</block>
					<block v-else>
						<button class="commit-btn">确认</button>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		name: 'Keyboard',
		props: {
			digitList: {
				type: Array,
				default() { return [] }
			}
		},
		data() {
			return {
				isShowCommit: false
			}
		},
		methods: {
			onDigit(digit) {
				let digitList = this.digitList;
				switch(digit) {
					case -1:
					 	digitList = [0];
						this.isShowCommit = false;
						break;
					case '+':
					case '-':
						this.digitAddorSub(digitList, digit);
						break;
					case '.':
						// 重复点击处理和自动补全0
						if(digitList[digitList.length-1] !== '.') {
							if(isNaN(digitList[digitList.length-1])) {
								digitList.push(0);
							}
							digitList.push(digit);
						}
						break;
					default: 
						digitList.push(digit);
						// 第一次输入将栈内的0弹出
						if(digitList[0] === 0) {
							if(/\d/.test(digitList[1])) {
								digitList.shift();
							}
						}
						break;
				}
				this.$emit('change', digitList)
				// this.digitList = digitList;
			},
			digitAddorSub(digitList, digit) {
				// 非空判断和上一个字符是否为+or-的处理
				if(digitList.length !== 0) {
					if(digitList[digitList.length-1] === '+' || digitList[digitList.length-1] === '-') {
						digitList.pop();
					}
					digitList.push(digit);
					this.isShowCommit = true;
				}
			},
			handleCalc() {
				if(this.digitList.length !== 0) {
					this.digitList = [JSON.stringify(this.digitList.join(''))
									.match(/(\-*\d+\.\d+)|([\-|\d]\d+)|\d+/g)
									.reduce((n, m) => Number(n) + Number(m))];
					// 如果点击了+ or - 则切换为等号
					if(!this.digitList.includes('+') && !this.digitList.includes('-')) {
						this.isShowCommit = false;
					}
				}
			}
		}
	}
	
</script>

<style scoped>
	
	button {
		background-color: unset;
	}
	button::after {
		border: none;
	}
	.keyboard-container {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		border: solid 1px #EEEEEE;
		background-color: #fff;
	}
	.keyboard {
		box-sizing: border-box;
		padding: 0 32rpx;
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
	.key-row .active-clear {
		color: #fff;
		background-color: #FF4949;
	}
	.active-gray {
		background-color: #EEEEEE;
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
