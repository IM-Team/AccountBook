<template>
	<view class="icon-cell">
		<view class="icon" :style="{ 'width' : width + 'rpx'}">
			<image class="img" :src="source" mode="widthFix"></image>
		</view>
		<text class="title">{{title}}</text>
	</view>
</template>

<script>
	export default {
		name: "IconCell",
		props: {
			width: {
				type: Number,
				default: 42,
			},
			source: {
				type: String,
				required: true
			},
			title: {
				type: String,
				required: true
			}
		}
	}
</script>

<style scoped>
	
	.icon-cell {
		display: flex;
		align-items: center;
	}

	.icon {
		display: flex;
		align-items: center;
		padding-right: 16rpx;
	}

	.icon .img {
		width: 100%;
	}
	
</style>
