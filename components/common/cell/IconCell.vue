<template>
	<view class="icon-cell">
		<view class="icon" :style="{width: width + 'rpx'}"><image :src="source" mode="widthFix"></image></view>
		<text class="title">{{title}}</text>
	</view>
</template>

<script>
	export default {
		name: "IconCell",
		props: {
			width: {
				type: Number,
				default: 42
			},
			source: {
				type: String
			},
			title: {
				type: String
			}
		}
	}
</script>

<style lang="less">
	.icon-cell {
		display: flex;
		align-items: center;
		.icon {
			display: flex;
			align-items: center;
			padding-right: 16rpx;
			image {
				width: 100%;
			}
		}
		.title {
			
		}
	}
</style>
