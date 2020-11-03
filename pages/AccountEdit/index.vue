<template>
	<view class="add_account_form-container">
		<view class="form-header">
			<view
                class="iconfont"
                :class="icon"
                :style="{ backgroundColor: iconColor }"></view>
			<view class="form-header-text">{{ iconName }}</view>
		</view>
		<view class="form-wrap">
			<view class="form-item">
				<view class="form-title">账户名称</view>
				<im-cell>
					<input
						class="input-account" 
						type="text" 
						v-model="account.name" 
						slot="title" 
						maxlength="10"
						placeholder="请输入账户名称" 
					/>
					<view slot="content">{{ accountNameLength }}/10</view>
				</im-cell>
			</view>
			
			<view class="form-item">
				<view class="form-title">账户信息</view>
				<im-cell :title=" account.categoryId == 1 ? '账户余额' : '负债额度' ">
					<input 
						@blur="inputBalance($event)"
						:value="account.balance == '0' ? '' : account.balance"
						class="input-balance" 
						type="digit"
						slot="content"
						placeholder="0" 
						maxlength="10"
					>
				</im-cell>
			</view>
			
			<view class="form-item">
				<view class="form-title">账户设置</view>
				<im-cell @click.native="inAccountBook" title="关联账本">
					<view slot="content" class="account_book">
						<text>{{ accountName }}</text>
						<view class="iconfont icon-gengduo"></view>
					</view>
				</im-cell>
			</view>

			<!-- commit button -->
			<view class="commit-btn-wrap">
				<block v-if="isModifyAccount">
					<view class="modify-commit-wrap">
						<view class="del-btn" @click="onDelete">删除</view>
						<view class="save-btn" @click="onModify">保存</view>
					</view>
				</block>
				<block v-else>
					<view class="form-commit" @click="onCreate">新建账户</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>

	import ImCell from '@/components/common/ImCell'
	
	import { deepClone } from '@/utils/utils'
    import {
        REMOVE_ACCOUNT,
        ADD_ACCOUNT,
        UPDATE_ACCOUNT
    } from '@/store/mutation-types'
	
	import { accountMapMixin } from '@/utils/mixins'
	import AccountModel from '../../model/AccountModel.js'
	import AccountBookModel from '../../model/AccountBookModel.js'
    import { data } from './data.json'
	
	
	const accountModel = new AccountModel();
    
	export default {
		name: 'AccontEdit',
		mixins: [accountMapMixin],
		data() {
			return {
				account: null,	// 当前账户
				accountBooks: [],	// 账本列表
				isModifyAccount: false	// 修改账户 or 新建账户
			}
		},
		created() {
			const accountBookModel = new AccountBookModel();
			accountBookModel.getAccountBooks().then(res => this.accountBooks = res );
		},
		onLoad(option) {
			// 修改账户 or 新建账户 相关处理
			if(option.id) {
				this.initModifyOfData(option);
			} else {
				this.initCreateOfData(option);
			}
		},
		components: {
			ImCell
		},
		computed: {
			// 计算账户名称的字数
			accountNameLength() {
                return this.account ? this.account.name.length : 0
            },
			accountName() {
				if(this.accountBooks.length === 0) return;
				return this.accountBooks.find(item => item.id == this.account.bookId).name;
			},
            icon() {
                return this.account && this.mixin_accounts[this.account.icon].icon
            },
            iconColor() {
                return this.account && this.mixin_accounts[this.account.icon].color
            },
            iconName() {
                return this.account && this.mixin_accounts[this.account.icon].name
            }
		},
		methods: {
			initModifyOfData(option) {
				this.isModifyAccount = true;
				const currentAccount = this.$store.getters.findAccount(Number(option.id), option.account_type);
				this.account = deepClone(currentAccount);
            },
			initCreateOfData(option) {
                this.account = {
                    icon: option.type,
					balance: '0',
					name: '',
					bookId: 1,
					categoryId: Number(option.account_type),
                }
			},
			// 绑定balance数据
			inputBalance(event) {
				this.account.balance = event.detail.value;
			},
			// 点击提交按钮的处理函数
			onCreate() {
				this.CreateAndModify(true);
			},
			// 点击保存修改的处理函数
			onModify() {
				this.CreateAndModify(false);
			},
			// 关联账本处理函数
			inAccountBook() {
				let AccountBook = [];
				
				for(let item of this.accountBooks) AccountBook.push(item.name);
				
				uni.showActionSheet({
				    itemList: AccountBook,
				    success: res => {
						this.currentAccountBook = AccountBook[res.tapIndex];
						this.account.bookId = this.accountBooks[res.tapIndex].id;
				    }
				});
			},
			// 点击删除按钮的处理函数
			onDelete() {
				uni.showModal({
				    title: '提示',
				    content: '确认删除该账户',
				    success: res => {
				        if (res.confirm) {
							accountModel.removeAccount(this.account.id).then(() => {
								this.$store.commit(REMOVE_ACCOUNT, {
									account_type: this.account.categoryId,
									id: this.account.id
								})
								uni.navigateBack({ delta: 1 });
							}, () => {
								uni.showToast({
									icon: "none",
									title: "请检查您的网络"
								})
							});
							
				        }
				    }
				});
			},
			// 创建or修改 处理函数
			CreateAndModify(isCreate) {

				if(!this.accountNameLength) {
					uni.showToast({
						icon: "none",
						title: "请输入账户名"
					})
					return;
				}
				
				// 如果blance为空个则补0
				this.account.balance = Number(this.account.balance) || '0';
				
				// 创建or修改 账户
				if(isCreate) {
					accountModel.createAccount(this.account).then(() => {
						this.$store.commit(ADD_ACCOUNT, {
						   account_type: this.account.categoryId,
						   data: this.account
						});
						uni.navigateBack({ delta: 2 });
					}, () => {
						uni.showToast({
							icon: "none",
							title: "请检查您的网络"
						})
					});
					
				} else {					
					accountModel.modifyAccount(this.account).then(() => {
						this.$store.commit(UPDATE_ACCOUNT, {
						   account_type: this.account.categoryId,
						   id: this.account.id,
						   data: this.account
						});
						uni.navigateBack({ delta: 1 });
					}, () => {
						uni.showToast({
							icon: "none",
							title: "请检查您的网络"
						})
					});
					
				}
			}
		}
	}
	
</script>

<style scoped>

	.add_account_form-container {
		padding: 32rpx;
		color: #333;
	}
	.form-header {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.form-header-text {
		padding: 16rpx 0 48rpx 0;
		font-size: 32rpx;
	}
	.form-header .iconfont {
		width: 120rpx;
		height: 120rpx;
		line-height: 120rpx;
		border-radius: 50%;
		font-size: 60rpx;
		text-align: center;
		color: #fff;
		background-color: #188AFF;
	}
	.form-item {
		margin-bottom: 48rpx;
	}
	.form-item .form-title {
		padding-bottom: 10rpx;
		font-size: 28rpx;
		color: #999;
	}
	.account_book {
		display: flex;
		align-items: center;
	}
	.account_book .iconfont {
		padding-left: 10rpx;
	}
	.commit-btn-wrap {
		padding-top: 32rpx;
	}
	.form-commit {
		padding: 32rpx 0;
		border-radius: calc((100vw - 32 * 2rpx) / 2);
		text-align: center;
		font-size: 32rpx;
		color: #fff;
		background-color: #188AFF;
	}
	.modify-commit-wrap {
		display: flex;
		border-radius: calc(100vw - 32rpx * 2);
		overflow: hidden;
	}
	.del-btn,
	.save-btn {
		flex: 1;
		padding: 28rpx 0;
		font-size: 32rpx;
		text-align: center;
		color: #fff;
	}
	.save-btn {
		color: #FFFFFF;
		background-color: #188AFF;
	}
	.del-btn {
		color: #FF4949;
		background-color: #fff;
	}
	.input-account,
	.input-balance,
	.input-note {
		width: 500rpx;
	}

</style>