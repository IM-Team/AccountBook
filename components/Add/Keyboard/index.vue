<template>
	<view class="keyboard-container">
		<view class="keyboard">
			<view
				class="key-wrap center"
				v-for="(key, index) in keys"
				:key="index">
				<button
					v-if="index === 3"
					class="key-btn center"
					hover-class="active-gray"
					@click="onDigit(key)">
					<text class="iconfont icon-delete_back"></text>
				</button>
				<button
					v-else-if="index === 15"
					class="key-btn center"
					hover-class="active-gray"
					@click="onDigit(key)">
					<view class="center key-text">{{ isShowCommit ? '=' : key }}</view>
				</button>
				<button
					v-else
					class="key-btn center"
					hover-class="active-gray"
					@click="onDigit(key)">
					<view class="center key-text">{{ key }}</view>
				</button>
			</view>
		</view>
	</view>
</template>

<script>

	export default {
		name: 'Keyboard',
		data() {
			return {
				inputStack: ['0'],
				isShowCommit: false,
				keys: [1, 2, 3, '删除', 4, 5, 6, '+', 7, 8, 9, '-', '清除', 0, '.', '确认']
			}
		},
		created() {
			uni.getStorage({
				key: 'tmpBillDetail',
				success: ({ data }) => {
					this.inputStack = data.price.split('')
				}
			})
		},
		methods: {
			onDigit(digit) {
				switch(digit) {
					case '确认':
						this.onEqual();
						break;
					case '删除':
						this.onBack();
						break;
					case '清除':
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
				// inputStack则补0
				if(this.inputStack.length === 0) this.inputStack = [0];
				// 如果没有+or-则显示确认按钮
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
	
	.keyboard-container {
		height: 100%;
		background-color: #fff;
	}
	
	.keyboard {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		padding: 32rpx;
	}
	
	.key-wrap {
		width: 25%;
		height: 25%;
	}
	
	.key-btn::after { border: none; }
	
	.key-btn {
		width: 90%;
		height: 90%;
		background-color: #fff;
		margin: 0;
		padding: 0;
	}
	
	.key-text {
		width: 100%;
		height: 100%;
	}
	
	.key-wrap:nth-child(13) .key-text,
	.key-wrap:nth-child(16) .key-text {
		font-size: 32rpx;
	}
	
	.key-wrap:nth-child(13) .key-text {
		color: #FF4949;
	}
	
	.key-wrap:nth-child(16) .key-text {
		background-color: #188AFF;
		color: #fff;
	}
	
	.active-gray {
		background-color: #EEEEEE;
	}

</style>
