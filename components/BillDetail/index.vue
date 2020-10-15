<template>
	<view v-if="isShow" class="bill_detail-container" @touchmove.stop.prevent>
		<view class="mask" :class="{ 'leave': isLeave }" v-show="isAnimate" @click="hide"></view>
		<view class="content" :class="{ 'leave': isLeave }" v-show="isAnimate">
			<view class="header">
				<view class="name">
					<text class="iconfont icon-canyin"></text>
					<text>{{ billDetail.name }}</text>
				</view>
				<view class="price">{{ billDetail.price }}</view>
			</view>
			<view class="info">
				<view class="info-item">
					<text>记账日期</text>
					<text>{{ billDetail.date }}</text>
				</view>
				<view class="info-item">
					<text>记账时间</text>
					<text>{{ billDetail.time }}</text>
				</view>
				<view class="info-item">
					<text>资金账户</text>
					<text>{{ billDetail.account }}</text>
				</view>
				<view class="info-item">
					<text>账本名称</text>
					<text>{{ billDetail.accountBook }}</text>
				</view>
				<view class="info-item">
					<text>备注信息</text>
					<text>{{ billDetail.note }}</text>
				</view>
			</view>
			<view class="options">
				<view class="iconfont icon-delete"></view>
				<view class="iconfont icon-edit"></view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		name: 'BillDetail',
		props: {
			isShow: {
				type: Boolean,
				required: true
			},
			hideHandle: {
				type: Function,
				required: true
			}
		},
		data() {
			return {
				isAnimate: false,	// 控制开始动画
				isLeave: false,		// 控制结束动画
				billDetail: {
					name: '餐饮',
					price: '-560.00',
					date: '2020-10-10',
					time: '16:00',
					account: '支付宝',
					accountBook: '默认账本',
					note: '这是我写的备注信息'
				}
			}
		},
		watch: {
			isShow(newValue) {
				if (newValue) this.$nextTick(() => this.isAnimate = true)
			}
		},
		methods: {
			hide() {
				
				this.isLeave = true
				
				setTimeout(() => {
					this.isLeave = false
					this.isAnimate = false
					this.hideHandle.call(this.$parent)
				}, 300)
			}
		}
	}
	
</script>

<style scoped>
	
	/* base */
	
	.bill_detail-container {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		z-index: 9999;
		display: flex;
	}
	
	.mask {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: -1;
		transition: .3s;
		background-color: rgba(0, 0, 0, .4);
		animation: mask-enter .4s;
	}
	
	.content {
		margin: auto;
		width: 90%;
		border-radius: 10px;
		overflow: hidden;
		background-color: #fff;
		transition: .3s;
		animation: content-enter .4s;
	}
	
	@keyframes mask-enter {
		0% {
			background-color: rgba(0, 0, 0, 0);
		}
	}
	
	@keyframes content-enter {
		0% {
			transform: translateY(100vh);
		}
	}
	
	.mask.leave {
		background-color: rgba(0, 0, 0, .0);
	}
	
	.content.leave {
		transform: translateY(100vh);
	}
	
	/* 内容 */

	.name {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 32rpx 0;
		color: #fff;
		background-color: #188AFF;
	}
	
	.price {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 200rpx;
		font-size: 60rpx;
	}
	
	.info {
		padding: 0 20rpx 80rpx;
		border-bottom: 1px dashed #ccc;
	}
	
	.info-item {
		padding: 0 60rpx;
		line-height: 2;
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
	}

	.options {
		width: 100%;
		height: 100rpx;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	
	.options .iconfont {
		font-size: 40rpx;
	}

</style>
