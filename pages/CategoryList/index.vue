<template>
	<view class="category_edit-container">
		<view class="header">
			<view class="tab">
				<view class="expense" :class="{ active: currentIndex === 1 }" @click="currentIndex = 1">收入</view>
				<view class="income" :class="{ active: currentIndex === 2 }" @click="currentIndex = 2">支出</view>
			</view>
			<view class="add" @click="onGotoAddCate">添加分类</view>
		</view>
		<view class="scroll">
			<view class="content">
				<view class="item" v-for="(item, index) in it" :key="index" @click="onToEditCate(item)">
					<im-cell :icon="item.icon" :title="item.name" :color="item.color">
						<view slot="content" class="iconfont icon-delete del-btn" @click.stop="onDelete(item.id)"></view>
					</im-cell>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import ImCell from '@/components/common/ImCell'
	import AccountBookModel from '../../model/AccountBookModel.js'
	import { mapState } from 'vuex'

	import {
		ADD_CATEGORY,
		REMOVE_CATEGORY
	} from '@/store/mutation-types'

	export default {
		name: 'CategoryEdit',
		data() {
			return {
				data: {},
				currentIndex: 1
			}
		},
		components: {
			ImCell
		},
		computed: {
			...mapState(['category']),
			it() {
				return this.category[this.currentIndex]
			}
		},
		methods: {
			onGotoAddCate() {
				uni.navigateTo({
					url: `/pages/AddCategory/index?index=${this.currentIndex}`
				})
			},
			onDelete(category_id) {
				uni.showModal({
					title: '提示',
					content: '确认删除该分类',
					success: res => {
						if (res.confirm) {
							const accountBookModel = new AccountBookModel();
							accountBookModel.removeCategory(category_id).then(res => {
								if (res == 2002) {
									uni.showToast({icon: "none", title: "账单中已使用该分类，不可删除"});
									return;
								}
								this.$store.commit(REMOVE_CATEGORY, {
									type: this.currentIndex,
									category_id: category_id
								})
							});
						}
					}
				});
			},
			onToEditCate(category) {
				uni.setStorage({
					key: "category_edit",
					data: category,
					success() {
						uni.navigateTo({ url: "/pages/AddCategory/index" })
					}
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

	.del-btn {
		color: #C2C2C2;
	}
</style>
