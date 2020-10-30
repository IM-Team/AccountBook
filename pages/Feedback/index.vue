<template>
	<view class="feedback-container">
		<view class="title-wrap">
			<view class="title" :class="{active: currentTitle === 1}" @click="currentTitle = 1">问题反馈</view>
			<view class="title-space"></view>
			<view class="title" :class="{active: currentTitle === 2}" @click="currentTitle = 2">产品建议</view>
		</view>
		<view class="content-wrap">
			<textarea 
				v-model=content
				maxlength=240 
				class="content"
				placeholder="请输入10个字以上的问题或建议描述以便我们提供更好的帮助" 
			/>
			<view class="total">{{ calcTotal }}/240</view>
		</view>
		<view class="send-btn" @click="onSend">发送</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentTitle: 1,
				content: ''
			}
		},
		computed: {
			calcTotal() {
				// 去除首个空格
				this.content = this.content.replace(/^\s*/,"");
				return this.content.split('').length;
			}
		},
		methods: {
			onSend() {
				if(this.calcTotal < 10) {
					uni.showToast({
						title: "不能少于10个字符",
						icon: "none"
					})
				} else {
					uni.navigateBack({ delta: 1	});
				}
			}
		}
	}
</script>

<style scoped>
	.feedback-container {
		padding: 32rpx;
	}
	.title-wrap .active {
		color: #188AFF;
	}
	.title-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.title {
		font-size: 28rpx;
		color: #c2c2c2;
	}
	.title-space {
		width: 1px;
		height: 1em;
		margin: 0 16rpx;
		background-color: #C2C2C2;
	}
	.content-wrap {
		min-height: 40vh;
		margin: 32rpx 0;
		padding: 32rpx;
		border-radius: 16px;
		background-color: #fff;
	}
	.content {
		width: 100%;
		height: 40vh;
		line-height: 1.2em;
		color: #888;
	}
	.total {
		color: #888;
		text-align: right;
	}
	.send-btn {
		padding: 28rpx 0;
		text-align: center;
		border-radius: calc(100vw - (32rpx * 2));
		color: #fff;
		background-color: #188AFF;
	}
</style>
