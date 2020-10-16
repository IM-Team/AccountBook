<template>
	<view class="category_edit-container">
		<view class="header">
			<view class="tab">
				<view class="expense">支出</view>
				<view class="income">收入</view>
			</view>
			<view class="add" @click="onGotoAddCate">添加分类</view>
		</view>
		<view class="scroll">
			<view class="content">
				<im-cell
					class="item"
					icon="icon-canyin"
					title="餐饮"
					v-for="(item, index) in 10"
					:key="index" />
			</view>
		</view>
	</view>
</template>

<script>
	
	import ImCell from '@/components/common/ImCell'
	
	export default {
		name: 'CategoryEdit',
		components: {
			ImCell
		},
		methods: {
			onGotoAddCate() {
				uni.navigateTo({
					url: '/pages/AddCategory/index'
				})
			}
		}
	}
	
</script>

<style scoped>

	.category_edit-container {
		display: flex;
		flex-direction: column;
	}
	
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 32rpx;
		padding: 0 32rpx;
	}
	
	.tab {
		width: 280rpx;
		height: 60rpx;
		overflow: hidden;
		display: flex;
		border-radius: 100rpx;
		border: 1px solid #188AFF;
	}
	
	.add {
		width: 200rpx;
		height: 60rpx;
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50rpx;
		background-color: #188AFF;
		color: #fff;
		font-size: 32rpx;
	}
	
	.income,
	.expense {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #188AFF;
		color: #fff;
	}
	
	.income {
		background-color: #fff;
		color: #188AFF;
	}
	
	.scroll {
		height: calc(100vh - 126rpx);
		padding: 0 32rpx;
		overflow: hidden auto;
	}
	
	.item {
		margin-bottom: 32rpx;
	}

</style>
