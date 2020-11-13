<template>
	<view class="account_book-container">
		<view class="manage-wrap">
			<view class="show-menu-btn" @click="isShowManageMenu = !isShowManageMenu; onManageIndex = 0">
				<view v-if="!isShowManageMenu" class="iconfont icon-shezhi">管理</view>
				<view v-else>取消</view>
			</view>

			<view class="manage-menu" v-show="isShowManageMenu" :style="{right: isShowManageMenu ? '140rpx' : '-200rpx'}">
				<view class="manage-btn"
					@click="onManageIndex = 1"
					:style="{color: onManageIndex == 1 ? '#FF4949' : '#888'}">删除</view>
				<view class="manage-space"></view>
				<view class="manage-btn"
					@click="onManageIndex = 2"
					:style="{color: onManageIndex == 2 ? '#188AFF' : '#888'}">编辑</view>
			</view>
		</view>


		<view class="account_book-wrap">
			<view class="book-container" v-for="item in accountBooks" :key="item.id">
				<view class="account_book" :class="{ active: item.id === currentId }" :style="{
				        backgroundImage: `linear-gradient(to top, ${item.color[0]} 0%, ${item.color[1]} 100%)`
				    }"
				 @click="onToggle(item)">
					<text class="name">{{ item.name }}</text>
				</view>
				<view class="book-handle-wrap" v-show="isShowManageMenu">
					<view v-if="onManageIndex === 1" @click="onRemoveBook(item)" style="color: #FF4949" class="iconfont icon-delete book-handle-btn"></view>
					<view v-if="onManageIndex === 2" @click="onUpdataBook(item)" style="color: #188AFF" class="iconfont icon-edit book-handle-btn"></view>
				</view>
			</view>

			<view class="account_book account_book-add" @click="onAdd">
				<text class="name">添加账本</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import AccountBookModel from '@/model/AccountBookModel'
	import AccountModel from '@/model/AccountModel'
	import {
		CURRENT_ACCOUNT_BOOK,
		ACCOUNT_BOOKS,
		REMOVE_ACCOUNT_BOOK
	} from '@/store/mutation-types'
	import {
		turnoverMixin
	} from '@/utils/mixins'

	const accountBookModel = new AccountBookModel()
	const accountModel = new AccountModel()

	export default {
		name: 'AccountBook',
		mixins: [turnoverMixin],
		data() {
			return {
				currentId: 0,
				isShowManageMenu: false,
				onManageIndex: 0
			}
		},
		created() {
			this.currentId = this.$store.state.currentAccountBook.id
		},
		computed: {
			...mapState(['accountBooks', 'currentAccountBook'])
		},
		methods: {
			onToggle(accountBook) {
				this.currentId = accountBook.id
				this.$store.commit(CURRENT_ACCOUNT_BOOK, accountBook)
				this.refreshData(accountBook.id)

				uni.navigateBack()
			},
			onAdd() {
				uni.navigateTo({ url: '/pages/AccountBookAdd/index'	});
			},
			refreshData(id) {
				Promise.all([
					accountBookModel.getCategory(id),
					accountBookModel.getAccountBooks(),
					accountModel.getAccountList(id)
				]).then(res => {
					this.initCategory(res[0])
					this.initAccountBook(res[1])
					this.initAccount(res[2])
				})

				const date = new Date()
				this.switchTurnoverDate(date.getFullYear(), date.getMonth() + 1, id)
			},
			initCategory(res) {
				const tmpCate = {
					1: [],
					2: []
				}
				res.forEach(item => tmpCate[item.type].push(item))

				this.$store.dispatch('category', tmpCate)
			},
			initAccountBook(res) {
				res.forEach(item => item.color = item.color.split(','))

				this.$store.dispatch('accountBooks', res)
			},
			initAccount(res) {
				const tmpAcount = {
					capitals: [],
					credits: []
				}

				for (const account of res.accountList) {
					if (account.categoryId === 1) {
						tmpAcount.capitals.push(account);
					} else if (account.categoryId === 2) {
						tmpAcount.credits.push(account);
					}
				}

				this.$store.dispatch('account', tmpAcount)
			},
			onRemoveBook(item) {
				if(this.currentId == item.id) {
					uni.showToast({icon: "none", title: "该账本正在使用"});
					return;
				}
				
				uni.showModal({
					title: '删除账本',
					content: '该操作会删除账本下的所有数据',
					confirmColor: "#FF4949",
					success: res => {
					    if (res.confirm) {
							this.handleRemoveBook(item.id);
						}
					}
				})

			},
			handleRemoveBook(id) {
				accountBookModel.removeAccountBook(id).then(res => {
					this.$store.commit(REMOVE_ACCOUNT_BOOK, id);
				})
			},
			onUpdataBook(item) {
				uni.setStorage({
					key: "account_book_edit",
					data: item,
					success() {
						uni.navigateTo({ url: "../AccountBookAdd/index" });
					}
				})
			}
		}
	}
</script>

<style scoped>
	.account_book-container {
		padding: 32rpx;
	}

	.manage-wrap {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 32rpx 0;
		position: relative;
		overflow: hidden;
	}

	.manage-menu {
		position: absolute;
		display: flex;
		right: -200rpx;
		align-items: center;
		transition: right .3s;
	}

	.account_book-wrap {
		width: 100vw;
		display: flex;
		flex-wrap: wrap;
	}

	.book-container {
		position: relative;
	}

	.account_book {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 200rpx;
		height: 300rpx;
		margin-top: 32rpx;
		margin-right: calc((100vw - 64rpx - 600rpx) / 2);
		background-image: linear-gradient(to top, #05a0ff 0%, #005bea 100%);
		border-radius: 6px;
		position: relative;
		overflow: hidden;
	}

	.account_book:nth-child(3n) {
		margin-right: 0;
	}

	.active::before {
		content: "已选";
		position: absolute;
		left: 0;
		top: 0;
		width: 160rpx;
		background-color: #f4c106;
		font-size: 28rpx;
		text-align: center;
		transform: rotate(-45deg) translate(-28%, -60%);
		color: #fff;
	}

	.name {
		width: 14rpx;
		margin-right: 40rpx;
		text-align: center;
		font-size: 28rpx;
		color: #fff;
		writing-mode: horizontal-tb;
		word-wrap: break-word;
		word-break: break-all;
	}


	.book-handle-btn {
		position: absolute;
		top: 16rpx;
		right: 16rpx;
		padding: 16rpx;
		color: #188AFF;
		border-radius: 50%;
		background-color: #fff;
	}

	.account_book-add {
		background-image: none;
		box-sizing: border-box;
		border: 2px solid #ccc;
	}

	.account_book-add .name {
		color: #aaa;
	}

	.show-menu-btn {
		position: absolute;
		right: 0;
		z-index: 11;
		padding-left: 32rpx;
		padding-right: 32rpx;
		color: #2B303B;
		background-color: #F2F2F7;
	}
	.manage-btn {
		color: #888;
	}

	.manage-space {
		width: 1px;
		height: 1em;
		margin: 0 16rpx;
		background-color: #999;
	}
</style>
