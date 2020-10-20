<template>
	<view class="keyboard-container">
		<view class="keyboard">
				<view class="key-row">
					<button class="key-item" hover-class="active-gray" @click="onDigit(1)">1</button>
					<button class="key-item" hover-class="active-gray" @click="onDigit(2)">2</button>
					<button class="key-item" hover-class="active-gray" @click="onDigit(3)">3</button>
					<button class="key-item" hover-class="active-gray" @click="onDigit('b')"><view class="iconfont icon-delete_back"></view></button>
				</view>
				<view class="key-row">
					<button class="key-item" hover-class="active-gray" @click="onDigit(4)">4</button>
					<button class="key-item" hover-class="active-gray" @click="onDigit(5)">5</button>
					<button class="key-item" hover-class="active-gray" @click="onDigit(6)">6</button>
					<button class="key-item" hover-class="active-gray" @click="onDigit('+')">+</button>
				</view>
				<view class="key-row">
					<button class="key-item" hover-class="active-gray" @click="onDigit(7)">7</button>
					<button class="key-item" hover-class="active-gray" @click="onDigit(8)">8</button>
					<button class="key-item" hover-class="active-gray" @click="onDigit(9)">9</button>
					<button class="key-item" hover-class="active-gray" @click="onDigit('-')" style="line-height: 98rpx;">-</button>
				</view>
				<view class="key-row">
					<button class="key-item clear-btn" hover-class="active-clear" @click="onDigit('c')">清除</button>
					<button class="key-item" hover-class="active-gray" @click="onDigit(0)">0</button>
					<button class="key-item" hover-class="active-gray" @click="onDigit('.')">.</button>
					<view class="key-commit">
						<block v-if="isShowCommit">
							<button class="commit-btn" @click="onDigit('e')">=</button>
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
		name: 'Keyboard',
		props: {
			// inputStack: {
			// 	type: Array,
			// 	default() { return [] }
			// }
		},
		data() {
			return {
				inputStack: [0],
				isShowCommit: false
			}
		},
		methods: {
			onDigit(digit) {
				switch(digit) {
					case 'e':
						this.onEqual();
						break;
					
					case 'b':
						this.onBack();
						break;
						
					case 'c':
						this.onClear();
						break;
						
					case '+':
					case '-':
						this.onOperator(digit);
						break;
						
					case '.':
						this.onDot(digit);
						break;
						
					default: 
						this.onNumber(digit);
						break;
				}
				this.$emit('change', this.inputStack);
			},
			
			// keyboard 等于按钮 事件处理函数
			onEqual() {
				if(this.inputStack.length !== 0) {
					this.countTotal();
					// 切换为确认按钮
					this.isShowCommit = false;
				}
			},
			
			// keyboard 退格按钮 事件处理函数
			onBack() {
				this.inputStack.pop();
				if(this.inputStack.length === 0) this.inputStack = [0];
				if(!this.inputStack.includes('+') && !this.inputStack.includes('-')) this.isShowCommit = false;
			},
			
			// keyboard 清除按钮 事件处理函数
			onClear() {
				this.inputStack = [0];
				// 切换为确认按钮
				this.isShowCommit = false;
			},
			
			// keyboard 运算符按钮 事件处理函数
			onOperator(digit) {
				// 非空判断和上一个字符是否为+or-的处理
				if(this.inputStack.length !== 0) {
					// 重复输入处理
					if(this.inputStack[this.inputStack.length-1] === '+' || this.inputStack[this.inputStack.length-1] === '-') {
						this.inputStack.pop();
					}
					// 计算上一对二元运算
					if(/\d+[\-\+]\d+/.test(this.inputStack.join(''))) {
						this.countTotal();
					} 
					this.inputStack.push(digit);
					// 切换为等于按钮
					this.isShowCommit = true;
				}
			},
			
			// keyboard 点按钮 事件处理函数
			onDot(digit) {
				// 重复点击处理
				if(this.inputStack[this.inputStack.length-1] !== '.') {
					if(isNaN(this.inputStack[this.inputStack.length-1])) {
						this.inputStack.push(0);
					}
					// 一个数里仅能出现一个'.'
					let tempArry = this.digitToNumber(this.inputStack);
					if(!tempArry[tempArry.length - 1].includes('.')) {
						// 自动补齐0
						this.inputStack.push(digit);
					}
				}
			},
			
			// keyboard 数字按钮 事件处理函数
			onNumber(digit) {
				// 限制仅保留两位小数
				if(!/\.[0-9]{2}/.test(this.inputStack.slice(this.inputStack.length - 3).join(''))) {
					this.inputStack.push(digit);
				}
				// 第一次输入将栈内的0弹出
				if(this.inputStack[0] === 0) {
					if(/\d/.test(this.inputStack[1])) {
						this.inputStack.shift();
					}
				}
			},
			
			// keyboard 计算digit总值
			countTotal() {
				// 整合数
				this.inputStack = this.digitToNumber(this.inputStack);
				// 计算总和值
				this.inputStack = [this.inputStack.reduce((n, m) => Number(n) + Number(m))];
				// 四舍五入仅保留两位小数
				this.inputStack[0] = Math.round(this.inputStack[0] * 100) / 100;
				// 重新拆分为单个digit
				this.inputStack = String(this.inputStack[0]).split('');
			},
			// keyboard 整合数字
			digitToNumber(digitArray) {
				return digitArray.join('').match(/(\+*\d+\.\d+)|([\+|\d]\d+)|(\-*\d+\.\d+)|([\-|\d]\d+)|\d+/g);
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
		width: 160rpx;
		height: 104rpx;
		line-height: 104rpx;
		font-size: 48rpx;
		text-align: center;
		border-radius: 8px
	}
	.key-row .clear-btn {
		font-size: 32rpx;
		color: #FF4949;
		background-color: unset;
	}
	.key-row .active-clear {
		color: #fff;
		background-color: #FF4949;
	}
	.key-row .active-gray {
		background-color: #EEEEEE;
	}
	.commit-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 160rpx;
		height: 100%;
		font-size: 32rpx;
		border-radius: 8px;
		color: #fff;
		background-color: #188AFF;
	}
	
</style>
