<template>
	<view class="turnover_list_item-container">
		<view class="header">
			<view>2020/10/10</view>
			<view>
				<text>收入 56,560.00</text>
				<text class="expenses">支出 1163.00</text>
			</view>
		</view>
		<view class="cell"
			v-for="(item, index) in 4"
			:key="index"
			@click="onTap">
			<im-cell title="餐食" icon="icon-canyin" content="300.00"></im-cell>
		</view>
	</view>
</template>

<script>
	
	const app = getApp()
	
	export default {
		name: 'TurnoverListItem',
		methods: {
			onTap() {
				this.$root.showBillDetail()
			}
		}
	}
</script>

<style scoped>
	
	.header {
		height: 60rpx;
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
		color: #757575;
	}
	
	.expenses {
		margin-left: 20rpx;
	}

</style>
