<template>
	<view class="category_edit-container">
		<view class="header">
			<view class="tab">
				<view
					class="expense"
					:class="{ active: currentIndex === 1 }"
					@click="currentIndex = 1">收入</view>
				<view
					class="income"
					:class="{ active: currentIndex === 2 }"
					@click="currentIndex = 2">支出</view>
			</view>
			<view class="add" @click="onGotoAddCate">添加分类</view>
		</view>
		<view class="scroll">
			<view class="content">
				<view 
					class="item"
					v-for="(item, index) in it"
					:key="index"
				>
					<im-cell
						:icon="item.icon"
						:title="item.name"
						:color="item.color"
					/>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	import ImCell from '@/components/common/ImCell'
	
	import res from './data.json'
	
	export default {
		name: 'CategoryEdit',
		data() {
			return {
				data: res.data,
				currentIndex: 1
			}
		},
		components: {
			ImCell
		},
		onShow() {
			const res = uni.getStorage({
				key: 'tmpCateInfo',
				success: (res) => {
					const key = this.currentIndex === 1 ? 'income' : 'expense'
					this.data[key].push(res.data)
					
					uni.removeStorage({ key: 'tmpCateInfo' })
				}
			})
		},
		computed: {
			it() {
				return this.data[this.currentIndex === 1 ? 'income' : 'expense']
			}
		},
		methods: {
			onGotoAddCate() {
				uni.navigateTo({
					url: `/pages/AddCategory/index?index=${this.currentIndex}`
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
		background-color: #fff;
		color: #188AFF;
	}
	
	.active {
		background-color: #188AFF;
		color: #fff;
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
