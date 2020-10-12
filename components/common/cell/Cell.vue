<template>
	<view class="container-cell">
		<view class="cell-warp" :style="{height: height + 'rpx', backgroundColor: backgroundColor}">
			<view class="title"><slot name="title"></slot></view>
			<view class="value"><slot name="value"></slot></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Cell",
		data() {
			return {
				
			}
		},
		props: {
			// cell the height
			height: {
				type: Number,
				default: 88
			},
			backgroundColor: {
				type: String,
				default: "#fff"
			}
		}
	}
</script>

<style scoped>
	
	.cell-warp {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #2b303b;
	}
	
	.title {
		flex: 1;
		padding: 0 32rpx;
		font-size: 28rpx;
	}
	.value {
		// flex: 1;
		padding: 0 32rpx;
		font-size: 24rpx;
		text-align: right;
	}

</style>
