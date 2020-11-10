<template>
	<view class="classify-wrap">
		<view class="classify" v-for="(item, index) in series" :key="index">
			<view class="title">
				<view class="iconfont icon-yaowan"></view>
				<view class="title-text">{{ item.name }}</view>
			</view>
			<view class="scale">{{ toPercentage(item.data) }}</view>
			<view class="total">{{ item.data }}</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		name: 'StatisticList',
		props: {
			series: {
				type: Array,
				required: true
			}
		},
		computed: {
			totalPrice() {
				let total = 0
                this.series.forEach(item => total += item.data )
                
				return total
			}
		},
		methods: {
			toPercentage(number) {
			    return ((number / this.totalPrice).toFixed(4) * 100).toFixed(2) + '%'
			}
		}
	}
	
</script>

<style scoped>
	
	.classify-wrap {
		padding-top: 32rpx;
	}
	
	.classify {
		display: flex;
		/* justify-content: space-between; */
		font-size: 28rpx;
		padding: 32rpx;
		line-height: 60rpx;
		border-radius: 10px;
		margin-bottom: 28rpx;
		background-color: #fff;
	}
	.title,
	.scale,
	.total {
		flex: 1;
	}
	.scale {
		text-align: center;
	}
	.total {
		text-align: right;
	}
	
	.title {
		display: flex;
	}
	
	.title .iconfont {
		width: 60rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 50%;
		color: #fff;
		background-color: #188AFF;
	}
	
	.title .title-text {
		padding-left: 16rpx;
	}
	
</style>
