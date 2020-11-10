<template>
	<view class="cell-container">
		<view class="cell-title">
			<block v-if="icon">
				<view
					class="iconfont title-icon"
					:class="icon"
					:style="{ backgroundColor: color }"
				></view>
			</block>
			<view class="title-text">
				<text v-if="title">{{title}}</text>
			</view>
		</view>
		<view class="center">
			<slot name="center"></slot>
		</view>
		<view class="cell-content">
			<text v-if="content">{{ content }}</text>
			<slot name="content"></slot>
		</view>
	</view>
</template>

<script>

	export default {
		name: 'IMCell',
		props: {
			icon: String,
			title: String,
			content: String,
			color: {
				type: String,
				default: '#188AFF'
			}
		}
	}
	
</script>

<style scoped>
	
	.cell-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 32rpx;
		border-radius: 10px;
		background-color: #fff;
	}
	.cell-container .cell-title {
		display: flex;
		align-items: center;
	}
	.cell-container .cell-content {
		text-align: right;
		font-size: 28rpx;
	}
	
	/* cell title in style */
	.cell-title .title-icon {
		width: 60rpx;
		height: 60rpx;
		line-height: 60rpx;
		margin-right: 20rpx;
		border-radius: 50%;
		text-align: center;
		color: #fff;
		background-color: #188AFF;
	}
	.cell-title .title-text {
		font-size: 28rpx;
	}
	
</style>
