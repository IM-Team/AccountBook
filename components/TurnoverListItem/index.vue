<template>
	<view class="turnover_list_item-container">
		<view class="header">
			<view>2020/10/10</view>
			<view>
				<text>收入 56,560.00</text>
				<text class="expenses">支出 1163.00</text>
			</view>
		</view>
		<view class="cell" v-for="item in 4">
			<view class="type-wrap">
				<view class="iconfont icon-canyin"></view>
				<view>餐饮</view>
			</view>
			<view>300.00</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>

	.turnover_list_item-container {
		
	}
	
	.header {
		height: 60rpx;
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
		color: #757575;
		/* background-color: #188AFF; */
		/* border-radius: 16px; */
	}
	
	.expenses {
		margin-left: 20rpx;
	}
	
	.cell {
		display: flex;
		align-items: center;
		margin-bottom: 28rpx;
		padding: 32rpx;
		justify-content: space-between;
		border-radius: 16px;
		background-color: #fff;
	}
	
	.iconfont {
		width: 60rpx;
		height: 60rpx;
		margin-right: 20rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 50%;
		color: #fff;
		background-color: #188AFF;
	}
	
	.type-wrap {
		display: flex;
		align-items: center;
	}

</style>
